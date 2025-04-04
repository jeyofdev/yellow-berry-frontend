import { AuthPageAbstract } from '@abstract/auth-page.abstract';
import { Component, InputSignal, inject, input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComment } from '@models/form/form-comment.model';
import { ProductDetailsResponse } from '@models/product/product-details-response.model';
import { ButtonFormComponent } from '@shared/components/ui/buttons/button-form/button-form.component';
import { CardCommentComponent } from '@shared/components/ui/card/card-comment/card-comment.component';
import { RatingComponent } from '@shared/components/ui/form/rating/rating.component';
import { TextareaFieldComponent } from '@shared/components/ui/form/textarea-field/textarea-field.component';
import { TabLiComponent } from '@shared/components/ui/tabs/tab-li/tab-li.component';
import { TablistComponent } from '@shared/components/ui/tabs/tablist/tablist.component';
import { TabsModule } from 'primeng/tabs';

@Component({
	selector: 'app-tabs',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		TabsModule,
		TablistComponent,
		TabLiComponent,
		CardCommentComponent,
		TextareaFieldComponent,
		ButtonFormComponent,
		RatingComponent,
	],
	templateUrl: './tabs.component.html',
	styleUrl: './tabs.component.scss',
})
export class TabsComponent extends AuthPageAbstract<FormGroup<FormComment>> {
	private _formBuilder: FormBuilder = inject(FormBuilder);

	public product: InputSignal<ProductDetailsResponse | null> = input.required<ProductDetailsResponse | null>();

	public ratingCtrl!: FormControl<number>;
	public commentCtrl!: FormControl<string>;

	public tabTitles: { id: string; value: string }[] = [
		{ id: '0', value: 'Details' },
		{ id: '1', value: 'Informations' },
		{ id: '2', value: 'Reviews' },
	];

	public productDetails: string[] = [
		'Lorem ipsum dolor sit amet.',
		'Consectetur adipiscing elit.',
		' Sed ut perspiciatis unde omnis.',
		' Nemo enim ipsam voluptatem quia voluptas.',
		'At vero eos et accusamus.',
	];

	public productSpecificDetails: { name: string; value: string }[] = [
		{ name: 'Highlights', value: 'Lorem ipsum dolor sit amet.' },
		{ name: 'Seller', value: 'Consectetur adipiscing elit.' },
		{ name: 'services', value: ' Sed ut perspiciatis unde omnis.' },
	];

	public productInformations(): { name: string; value: string | number }[] {
		if (!this.product()) {
			return [];
		}

		return [
			{ name: 'Weight', value: this._convertWeightToString() },
			{ name: 'Dimensions', value: '17 × 15 × 3 cm' },
			{ name: 'Brand', value: 'lorem.' },
			{ name: 'Quantity', value: 5 },
			{ name: 'Color', value: this._convertColorsToString() },
		];
	}

	public override onSubmit(): void {
		console.log(this.mainForm.value);
	}

	private _convertColorsToString(): string {
		if (!this.product()) {
			return '';
		} else {
			const product = this.product();
			return product && product.informations.colorList.length > 0 ? product.informations.colorList.join(', ') : '';
		}
	}

	private _convertWeightToString(): string {
		if (!this.product()) {
			return '';
		} else {
			const product = this.product();
			return product && product.informations.weightList.length > 0 ? product.informations.weightList.join(', ') : '';
		}
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			rating: this.ratingCtrl,
			comment: this.commentCtrl,
		});
	}

	protected override initFormControls(): void {
		this.ratingCtrl = this._formBuilder.control<number>(0, {
			validators: [Validators.required, Validators.min(1), Validators.max(5)],
			nonNullable: true,
		});

		this.commentCtrl = this._formBuilder.control<string>('', {
			validators: [Validators.required],
			nonNullable: true,
		});
	}
}
