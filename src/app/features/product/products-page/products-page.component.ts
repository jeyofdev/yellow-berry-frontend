import { AuthPageAbstract } from '@abstract/auth-page.abstract';
import { Component, Signal, WritableSignal, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorEnum } from '@enum/color.enum';
import { WeightEnum } from '@enum/weight.enum';
import { BrandResponse } from '@models/brand/brand-response.model';
import { CategoryResponse } from '@models/category/category-response.model';
import { Category } from '@models/category/category.model';
import { Enum } from '@models/enum/enum.model';
import { FormProductFilters } from '@models/form/form-product-filters.model';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { TagResponse } from '@models/tag/tag-response.model copy';
import { Tag } from '@models/tag/tag.model';
import { BrandService } from '@services/brand.service';
import { CategoryService } from '@services/category.service';
import { ProductService } from '@services/product.service';
import { TagService } from '@services/tag.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { CarouselBrandComponent } from '@shared/components/ui/carousel/carousel-brand/carousel-brand.component';
import { FilterProductComponent } from '@shared/components/ui/filter/filter-product/filter-product.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ListProductComponent } from '@shared/components/ui/list/list-product/list-product.component';
import { enumToArray } from '@utils/enum.utils';
import { map, tap } from 'rxjs';

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
		FilterProductComponent,
	],
	templateUrl: './products-page.component.html',
	styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent extends AuthPageAbstract<FormGroup<FormProductFilters>> {
	private _brandService: BrandService = inject(BrandService);
	private _categoryService: CategoryService = inject(CategoryService);
	private _tagService: TagService = inject(TagService);
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
	public tagList: Signal<TagResponse[]> = this._getTagList();
	public colorList: Signal<Enum[]> = this._getColorList();
	public weightList: Signal<Enum[]> = this._getWeightList();

	public formValueSignal = signal(this.mainForm?.value || {});
	public filteredProductList: WritableSignal<ProductResponse[]> = signal<ProductResponse[]>([]);

	constructor() {
		super();

		effect(() => {
			this._updateFilteredProductList();
		});
	}

	private _updateFilteredProductList() {
		const formValues = this.formValueSignal();
		const filteredProducts = this.productList().filter((product: ProductResponse) => {
			const productCategoriesName =
				product.categories?.results.map((category: Category) => category.name.toLowerCase()) || [];

			const productTagsName = product.tags?.results.map((tag: Tag) => tag.name.toLowerCase()) || [];
			const productColorName = product.informations?.colorList.map(color => color.toLowerCase()) || [];
			const productWeightName = product.informations?.weightList.map(weight => weight.toLowerCase()) || [];

			const isCategoryMatch =
				formValues.category?.length === 0 ||
				formValues.category?.some(category => productCategoriesName.includes(category.toLowerCase()));

			const isTagMatch =
				formValues.tag?.length === 0 || formValues.tag?.some(tag => productTagsName.includes(tag.toLowerCase()));

			const isColorMatch =
				formValues.color?.length === 0 ||
				formValues.color?.some(color => productColorName.includes(color.toLowerCase()));

			const isWeightMatch =
				formValues.weight?.length === 0 ||
				formValues.weight?.some(weight => productWeightName.includes(weight.toLowerCase()));

			const isPriceMatch =
				formValues.price?.length === 2 &&
				product.priceDetails.priceDiscount >= formValues.price[0] &&
				product.priceDetails.priceDiscount <= formValues.price[1];

			return isCategoryMatch && isTagMatch && isColorMatch && isWeightMatch && isPriceMatch;
		});

		this.filteredProductList.set(filteredProducts);
	}

	public override onSubmit(): void {}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			category: this.categoryCtrl,
			color: this.colorCtrl,
			tag: this.tagCtrl,
			price: this.priceCtrl,
			weight: this.weightCtrl,
		});

		this._updateFormValueSignal();
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

	private _getTagList(): Signal<TagResponse[]> {
		return toSignal(
			this._tagService.findAll().pipe(map((tagResponse: SuccessResponse<TagResponse[]>) => tagResponse.result)),
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
	}

	private _updateFormValueSignal() {
		if (this.mainForm) {
			this.formValueSignal.set(this.mainForm.value);

			this.mainForm.valueChanges.pipe(tap(() => this.formValueSignal.set(this.mainForm?.value))).subscribe();
		}
	}
}
