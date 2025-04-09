import { AuthPageAbstract } from '@abstract/auth-page.abstract';
import { Component, InputSignal, OnDestroy, OnInit, OutputEmitterRef, inject, input, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuantityChangedEvent } from '@models/changed/quantity-changed-event.model';
import { FormProductFromCart } from '@models/form/register/form-product-from-cart.model';
import { ProductToCartResponse } from '@models/product-to-cart/product-to-cart-response';
import { CartService } from '@services/cart.service';
import { NumberStepFieldComponent } from '@shared/components/ui/form/number-step-field/number-step-field.component';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-quantity-form',
	imports: [FormsModule, ReactiveFormsModule, NumberStepFieldComponent],
	templateUrl: './quantity-form.component.html',
	styleUrl: './quantity-form.component.scss',
})
export class QuantityFormComponent
	extends AuthPageAbstract<FormGroup<FormProductFromCart>>
	implements OnInit, OnDestroy
{
	private _formBuilder: FormBuilder = inject(FormBuilder);
	private _cartService: CartService = inject(CartService);

	public product: InputSignal<ProductToCartResponse> = input.required<ProductToCartResponse>();

	public quantityChanged: OutputEmitterRef<QuantityChangedEvent> = output<QuantityChangedEvent>();

	public quantityCtrl!: FormControl<number>;

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
		this._cartService.updateProductFromCart(this.product().id, { quantity }).subscribe(() => {
			this.quantityChanged.emit({ productId: this.product().id, quantity });
		});
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
