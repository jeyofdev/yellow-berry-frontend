import { Component, InputSignal, OutputEmitterRef, input, output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandResponse } from '@models/brand/brand-response.model';
import { CategoryResponse } from '@models/category/category-response.model';
import { Enum } from '@models/enum/enum.model';
import { FormProductFilters } from '@models/form/form-product-filters.model';
import { ProductResponse } from '@models/product/product-response.model';
import { ButtonFilterComponent } from '@shared/components/ui/buttons/button-filter/button-filter.component';
import { FilterBoxComponent } from '@shared/components/ui/filter/filter-box/filter-box.component';
import { CheckboxColorFieldComponent } from '@shared/components/ui/form/checkbox/checkbox-color-field/checkbox-color-field.component';
import { CheckboxFieldComponent } from '@shared/components/ui/form/checkbox/checkbox-field/checkbox-field.component';
import { SliderFieldComponent } from '@shared/components/ui/form/slider-field/slider-field.component';
import { DividerModule } from 'primeng/divider';

@Component({
	selector: 'app-filter-product',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CheckboxFieldComponent,
		CheckboxColorFieldComponent,
		DividerModule,
		ButtonFilterComponent,
		SliderFieldComponent,
		FilterBoxComponent,
	],
	templateUrl: './filter-product.component.html',
	styleUrl: './filter-product.component.scss',
})
export class FilterProductComponent {
	public brandList: InputSignal<BrandResponse[]> = input.required<BrandResponse[]>();
	public productList: InputSignal<ProductResponse[]> = input.required<ProductResponse[]>();
	public categoryList: InputSignal<CategoryResponse[]> = input.required<CategoryResponse[]>();
	public colorList: InputSignal<Enum[]> = input.required<Enum[]>();
	public weightList: InputSignal<Enum[]> = input.required<Enum[]>();

	public form: InputSignal<FormGroup<FormProductFilters>> = input.required<FormGroup<FormProductFilters>>();

	public changed: OutputEmitterRef<void> = output<void>();
	public toggleTag: OutputEmitterRef<string> = output<string>();

	public getColorClass(color: string | number): string {
		return `color-${color}`;
	}

	public onChanged(): void {
		this.changed.emit();
	}

	public onToggleTag(tag: string): void {
		this.toggleTag.emit(tag);
	}
}
