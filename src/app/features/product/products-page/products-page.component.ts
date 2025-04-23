import { FormAbstract } from '@abstract/form/form.abstract';
import { Component, Signal, WritableSignal, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandResponse } from '@models/brand/brand-response.model';
import { CategoryResponse } from '@models/category/category-response.model';
import { Enum } from '@models/enum/enum.model';
import { FormProductFilter } from '@models/form/form-product-filter.model';
import { FormProductFilters } from '@models/form/form-product-filters.model';
import { ProductResponse } from '@models/product/product-response.model';
import { TagResponse } from '@models/tag/tag-response.model copy';
import { FilterService } from '@services/components/filter.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { CarouselBrandComponent } from '@shared/components/ui/carousel/carousel-brand/carousel-brand.component';
import { FilterProductComponent } from '@shared/components/ui/filter/filter-product/filter-product.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ListProductComponent } from '@shared/components/ui/list/list-product/list-product.component';
import { tap } from 'rxjs';

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
export class ProductsPageComponent extends FormAbstract<FormGroup<FormProductFilters>> {
	private _filterService: FilterService = inject(FilterService);
	private _formBuilder: FormBuilder = inject(FormBuilder);

	public categoryCtrl!: FormControl<string[]>;
	public colorCtrl!: FormControl<string[]>;
	public tagCtrl!: FormControl<string[]>;
	public priceCtrl!: FormControl<number[]>;
	public weightCtrl!: FormControl<string[]>;

	public brandList: Signal<BrandResponse[]> = this._filterService.brandList;
	public productList: Signal<ProductResponse[]> = this._filterService.productList;
	public categoryList: Signal<CategoryResponse[]> = this._filterService.categoryList;
	public tagList: Signal<TagResponse[]> = this._filterService.tagList;
	public colorList: Signal<Enum[]> = this._filterService.colorList;
	public weightList: Signal<Enum[]> = this._filterService.weightList;

	public formValueSignal = signal(this.mainForm?.value || {});
	public filteredProductList: WritableSignal<ProductResponse[]> = signal<ProductResponse[]>([]);

	public carouselBrandResponsiveOptions = [
		{
			breakpoint: '1400px',
			numVisible: 6,
			numScroll: 1,
		},
		{
			breakpoint: '1280px',
			numVisible: 5,
			numScroll: 1,
		},
		{
			breakpoint: '1100px',
			numVisible: 4,
			numScroll: 1,
		},
		{
			breakpoint: '960px',
			numVisible: 3,
			numScroll: 1,
		},
		{
			breakpoint: '768px',
			numVisible: 2,
			numScroll: 1,
		},
		{
			breakpoint: '400px',
			numVisible: 1,
			numScroll: 1,
		},
	];

	constructor() {
		super();

		effect(() => {
			this._updateFilteredProductList();
		});
	}

	private _updateFilteredProductList() {
		const formValues: Partial<FormProductFilter> = this.formValueSignal();
		this.filteredProductList.set(this._filterService.updateFilteredProductList(formValues));
	}

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
