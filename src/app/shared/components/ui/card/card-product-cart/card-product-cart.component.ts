import { AuthPageAbstract } from '@abstract/auth-page.abstract';
import { CommonModule } from '@angular/common';
import {
	Component,
	InputSignal,
	OnDestroy,
	OnInit,
	OutputEmitterRef,
	WritableSignal,
	inject,
	input,
	output,
	signal,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormProductFromCart } from '@models/form/register/form-product-from-cart.model';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { CartService } from '@services/cart.service';
import { ButtonIconSmallComponent } from '@shared/components/ui/buttons/button-icon-small/button-icon-small.component';
import { NumberStepFieldComponent } from '@shared/components/ui/form/field/number-step-field/number-step-field.component';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { Subscription, tap } from 'rxjs';

@Component({
	selector: 'app-card-product-cart',
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ImageModule,
		ButtonIconSmallComponent,
		InputNumberModule,
		NumberStepFieldComponent,
	],
	templateUrl: './card-product-cart.component.html',
	styleUrl: './card-product-cart.component.scss',
})
export class CardProductCartComponent
	extends AuthPageAbstract<FormGroup<FormProductFromCart>>
	implements OnInit, OnDestroy
{
	private _formBuilder: FormBuilder = inject(FormBuilder);
	private _cartService: CartService = inject(CartService);

	public product: InputSignal<ProductToCartResponse> = input.required<ProductToCartResponse>();
	public quantityCtrl!: FormControl<number>;

	price: WritableSignal<number> = signal<number>(0);

	sendProductIdAndDeleteProduct: OutputEmitterRef<string> = output<string>();
	sendUpdatedQuantityProduct: OutputEmitterRef<void> = output<void>();

	private quantityValueChangesSubscription!: Subscription;

	public override onSubmit(): void {}

	override ngOnInit(): void {
		super.ngOnInit();
		if (this.quantityCtrl) {
			this.quantityValueChangesSubscription = this.quantityCtrl.valueChanges.subscribe((quantity: number) => {
				this.onQuantityChange(quantity);
			});
		}
	}

	public onQuantityChange(quantity: number): void {
		this._cartService
			.updateProductFromCart(this.product().id, { quantity })
			.pipe(tap(() => this.sendUpdatedQuantityProduct.emit()))
			.subscribe();
	}

	public onDelete(): void {
		this.sendProductIdAndDeleteProduct.emit(this.product().id);
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			quantity: this.quantityCtrl,
		});
	}

	protected override initFormControls(): void {
		this.quantityCtrl = this._formBuilder.control<number>(this.product().quantity, {
			validators: [Validators.min(1)],
			nonNullable: true,
		});
	}

	ngOnDestroy(): void {
		if (this.quantityValueChangesSubscription) {
			this.quantityValueChangesSubscription.unsubscribe();
		}
	}
}
