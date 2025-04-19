import { AuthPageAbstract } from '@abstract/auth-page.abstract';
import { Component, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorEnum } from '@enum/color.enum';
import { WeightEnum } from '@enum/weight.enum';
import { BrandResponse } from '@models/brand/brand-response.model';
import { CategoryResponse } from '@models/category/category-response.model';
import { Enum } from '@models/enum/enum.model';
import { FormProductFilters } from '@models/form/form-product-filters.model';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { BrandService } from '@services/brand.service';
import { CategoryService } from '@services/category.service';
import { ProductService } from '@services/product.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { ButtonFilterComponent } from '@shared/components/ui/buttons/button-filter/button-filter.component';
import { CarouselBrandComponent } from '@shared/components/ui/carousel/carousel-brand/carousel-brand.component';
import { CheckboxColorFieldComponent } from '@shared/components/ui/form/checkbox/checkbox-color-field/checkbox-color-field.component';
import { CheckboxFieldComponent } from '@shared/components/ui/form/checkbox/checkbox-field/checkbox-field.component';
import { SliderFieldComponent } from '@shared/components/ui/form/slider-field/slider-field.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ListProductComponent } from '@shared/components/ui/list/list-product/list-product.component';
import { enumToArray, parseWeightStringToEnumKey } from '@utils/enum.utils';
import { DividerModule } from 'primeng/divider';
import { map } from 'rxjs';

@Component({
	selector: 'app-products-page',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		HeaderComponent,
		BreadcrumbComponent,
		LayoutContentComponent,
		CarouselBrandComponent,
		ListProductComponent,
		CheckboxFieldComponent,
		CheckboxColorFieldComponent,
		DividerModule,
		ButtonFilterComponent,
		SliderFieldComponent,
	],
	templateUrl: './products-page.component.html',
	styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent extends AuthPageAbstract<FormGroup<FormProductFilters>> {
	private _brandService: BrandService = inject(BrandService);
	private _categoryService: CategoryService = inject(CategoryService);
	private _productService: ProductService = inject(ProductService);
	private _formBuilder: FormBuilder = inject(FormBuilder);

	public categoryCtrl!: FormControl<string[]>;
	public colorCtrl!: FormControl<string[]>;
	public tagCtrl!: FormControl<string[]>;
	public priceCtrl!: FormControl<number[]>;
	public weightCtrl!: FormControl<string[]>;

	public brandList: Signal<BrandResponse[]> = this._getBrandList();
	public productList: Signal<ProductResponse[]> = this._getProductList();
	public categoryList: Signal<CategoryResponse[]> = this._getCategoryList();
	public colorList: Signal<Enum[]> = this._getColorList();
	public weightList: Signal<Enum[]> = this._getWeightList();

	public override onSubmit(): void {
		console.log(this.mainForm.value);
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			category: this.categoryCtrl,
			color: this.colorCtrl,
			tag: this.tagCtrl,
			price: this.priceCtrl,
			weight: this.weightCtrl,
		});
	}

	protected override initFormControls(): void {
		this.categoryCtrl = this._formBuilder.control<string[]>([], {
			nonNullable: true,
		});

		this.colorCtrl = this._formBuilder.control<string[]>([], {
			nonNullable: true,
		});

		this.tagCtrl = this._formBuilder.control<string[]>([], {
			nonNullable: true,
		});

		this.priceCtrl = this._formBuilder.control<number[]>([0, 1000], {
			nonNullable: true,
		});

		this.weightCtrl = this._formBuilder.control<string[]>([], {
			nonNullable: true,
		});
	}

	private _getBrandList(): Signal<BrandResponse[]> {
		return toSignal(
			this._brandService.findAll().pipe(map((brandResponse: SuccessResponse<BrandResponse[]>) => brandResponse.result)),
			{ initialValue: [] },
		);
	}

	private _getCategoryList(): Signal<CategoryResponse[]> {
		return toSignal(
			this._categoryService
				.findAll()
				.pipe(map((categoryResponse: SuccessResponse<CategoryResponse[]>) => categoryResponse.result)),
			{ initialValue: [] },
		);
	}

	private _getColorList(): Signal<Enum[]> {
		return signal<Enum[]>(enumToArray(ColorEnum));
	}

	private _getWeightList(): Signal<Enum[]> {
		const weightArr = enumToArray(WeightEnum, 'value').map((weight: Enum) => {
			const formatWeight = weight.value as number;
			return {
				...weight,
				value: formatWeight < 1000 ? `${weight.value}g` : `${formatWeight / 1000}kg`,
			};
		});

		return signal<Enum[]>(weightArr);
	}

	private _getProductList(): Signal<ProductResponse[]> {
		return toSignal(
			this._productService
				.findAll()
				.pipe(map((productResponse: SuccessResponse<ProductResponse[]>) => productResponse.result)),
			{ initialValue: [] },
		);
	}

	public toggleTag(tag: string): void {
		const currentTags = this.tagCtrl.value;

		if (currentTags.includes(tag)) {
			this.tagCtrl.setValue(currentTags.filter((t: string) => t !== tag));
		} else {
			this.tagCtrl.setValue([...currentTags, tag]);
		}

		this.tagCtrl.updateValueAndValidity();
		this.onSubmit();
	}

	public getColorClass(color: string | number): string {
		return `color-${color}`;
	}
}
