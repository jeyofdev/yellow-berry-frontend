import { AuthPageAbstract } from '@abstract/auth-page.abstract';
import { CommonModule } from '@angular/common';
import {
	Component,
	InputSignal,
	OnInit,
	Signal,
	WritableSignal,
	computed,
	effect,
	inject,
	input,
	signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAddToCart } from '@models/form/form-add-to-cart.model';
import { ProductDetailsResponse } from '@models/product/product-details-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { WishlistDetailsResponse } from '@models/wishlist/wishlist-details-response.model';
import { AuthService } from '@services/auth/auth.service';
import { ProductService } from '@services/product.service';
import { WishlistService } from '@services/wishlist.service';
import { ButtonComponent } from '@shared/components/ui/buttons/button/button.component';
import { NumberStepFieldComponent } from '@shared/components/ui/form/number-step-field/number-step-field.component';
import { PriceDiscountPercentageComponent } from '@shared/components/ui/price/price-discount-percentage/price-discount-percentage.component';
import { PriceComponent } from '@shared/components/ui/price/price/price.component';
import { RatingComponent } from '@shared/components/ui/rating/rating.component';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { catchError, map, tap } from 'rxjs';

@Component({
	selector: 'app-card-product-details',
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ImageModule,
		RatingComponent,
		ButtonModule,
		ButtonComponent,
		NumberStepFieldComponent,
		PriceDiscountPercentageComponent,
		PriceComponent,
	],
	templateUrl: './card-product-details.component.html',
	styleUrl: './card-product-details.component.scss',
})
export class CardProductDetailsComponent extends AuthPageAbstract<FormGroup<FormAddToCart>> implements OnInit {
	private _formBuilder: FormBuilder = inject(FormBuilder);
	private _productService: ProductService = inject(ProductService);
	private _wishlistService: WishlistService = inject(WishlistService);
	private _authService: AuthService = inject(AuthService);

	public product: InputSignal<ProductDetailsResponse | null> = input.required<ProductDetailsResponse | null>();
	public wishlistId: Signal<string> = this._getWishlistId();
	public wishlistProducts: WritableSignal<Set<string>> = signal<Set<string>>(new Set());
	public loggedIn = this._authService.getLoggedIn();

	public weightCtrl!: FormControl<string>;
	public activeWeight: WritableSignal<string> = signal<string>('');

	public isProductInWishlist: Signal<boolean> = computed(
		() => this.product() !== null && this.wishlistProducts().has(this.product()!.id),
	);

	public productNb: number = 1;

	constructor() {
		super();

		effect(() => {
			const p = this.product();
			if (p && p.informations?.weightList?.length && !this.activeWeight()) {
				this.activeWeight.set(p.informations.weightList[0]);
			}
		});

		this._loadWishlistProducts();
	}

	public onSubmit(): void {
		console.log(this.mainForm.value);
	}

	public onClickWeight(weight: string): void {
		this.weightCtrl.setValue(weight);
		this.activeWeight.set(weight);
	}

	public addOrRemoveToWishlist(): void {
		const productId = this.product()?.id as string;

		this._productService
			.addOrRemoveProductToWishlist({ productId, wishlistId: this.wishlistId() })
			.pipe(
				tap(() => {
					const updatedProducts = new Set(this.wishlistProducts());

					if (updatedProducts.has(productId)) {
						updatedProducts.delete(productId);
					} else {
						updatedProducts.add(productId);
					}

					this.wishlistProducts.set(updatedProducts);
				}),
			)
			.subscribe();
	}

	private _getWishlistId(): Signal<string> {
		if (this.loggedIn) {
			return toSignal(
				this._wishlistService.findByUserId().pipe(
					map((wishlistResponse: SuccessResponse<WishlistDetailsResponse>) => wishlistResponse.result.id),
					catchError(() => {
						return '';
					}),
				),
				{ initialValue: '' },
			);
		}
		return signal('');
	}

	private _loadWishlistProducts(): void {
		if (this.loggedIn) {
			toSignal(
				this._wishlistService.findByUserId().pipe(
					map(
						(wishlistResponse: SuccessResponse<WishlistDetailsResponse>) =>
							new Set(wishlistResponse.result.products.results.map(product => product.id)),
					),
					tap(productsSet => {
						this.wishlistProducts.set(productsSet);
					}),
				),
				{ initialValue: new Set<string>() },
			);
		}
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			weight: this.weightCtrl,
		});
	}

	protected override initFormControls(): void {
		this.weightCtrl = this._formBuilder.control<string>('', {
			nonNullable: true,
		});
	}
}
