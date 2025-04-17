import { AuthPageAbstract } from '@abstract/auth-page.abstract';
import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandResponse } from '@models/brand/brand-response.model';
import { FormProductFilters } from '@models/form/form-product-filters.model';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { BrandService } from '@services/brand.service';
import { ProductService } from '@services/product.service';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { CarouselBrandComponent } from '@shared/components/ui/carousel/carousel-brand/carousel-brand.component';
import { CheckboxColorFieldComponent } from '@shared/components/ui/form/checkbox/checkbox-color-field/checkbox-color-field.component';
import { CheckboxFieldComponent } from '@shared/components/ui/form/checkbox/checkbox-field/checkbox-field.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ListProductComponent } from '@shared/components/ui/list/list-product/list-product.component';
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
	],
	templateUrl: './products-page.component.html',
	styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent extends AuthPageAbstract<FormGroup<FormProductFilters>> {
	private _brandService: BrandService = inject(BrandService);
	private _productService: ProductService = inject(ProductService);
	private _formBuilder: FormBuilder = inject(FormBuilder);

	public categoryCtrl!: FormControl<string[]>;
	public colorCtrl!: FormControl<string[]>;

	public brandItemList: Signal<BrandResponse[]> = this._getBrandItemList();
	public productItemList: Signal<ProductResponse[]> = this._getProductItemList();

	public override onSubmit(): void {
		console.log(this.mainForm.value);
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			category: this.categoryCtrl,
			color: this.colorCtrl,
		});
	}

	protected override initFormControls(): void {
		this.categoryCtrl = this._formBuilder.control<string[]>([], {
			nonNullable: true,
		});

		this.colorCtrl = this._formBuilder.control<string[]>([], {
			nonNullable: true,
		});
	}

	private _getBrandItemList(): Signal<BrandResponse[]> {
		return toSignal(
			this._brandService.findAll().pipe(map((brandResponse: SuccessResponse<BrandResponse[]>) => brandResponse.result)),
			{ initialValue: [] },
		);
	}

	private _getProductItemList(): Signal<ProductResponse[]> {
		return toSignal(
			this._productService
				.findAll()
				.pipe(map((productResponse: SuccessResponse<ProductResponse[]>) => productResponse.result)),
			{ initialValue: [] },
		);
	}
}
