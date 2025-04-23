import { Injectable, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ColorEnum } from '@enum/color.enum';
import { WeightEnum } from '@enum/weight.enum';
import { BrandResponse } from '@models/brand/brand-response.model';
import { CategoryResponse } from '@models/category/category-response.model';
import { Category } from '@models/category/category.model';
import { Enum } from '@models/enum/enum.model';
import { FormProductFilter } from '@models/form/form-product-filter.model';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { TagResponse } from '@models/tag/tag-response.model copy';
import { Tag } from '@models/tag/tag.model';
import { BrandService } from '@services/brand.service';
import { CategoryService } from '@services/category.service';
import { ProductService } from '@services/product.service';
import { TagService } from '@services/tag.service';
import { enumToArray } from '@utils/enum.utils';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class FilterService {
	private _brandService: BrandService = inject(BrandService);
	private _categoryService: CategoryService = inject(CategoryService);
	private _tagService: TagService = inject(TagService);
	private _productService: ProductService = inject(ProductService);

	public brandList: Signal<BrandResponse[]> = this._getBrandList();
	public productList: Signal<ProductResponse[]> = this._getProductList();
	public categoryList: Signal<CategoryResponse[]> = this._getCategoryList();
	public tagList: Signal<TagResponse[]> = this._getTagList();
	public colorList: Signal<Enum[]> = this._getColorList();
	public weightList: Signal<Enum[]> = this._getWeightList();

	public updateFilteredProductList(formValues: Partial<FormProductFilter>) {
		return this.productList().filter((product: ProductResponse) => {
			const productCategoriesName =
				product.categories?.results.map((category: Category) => category.name.toLowerCase()) || [];

			const productTagsName = product.tags?.results.map((tag: Tag) => tag.name.toLowerCase()) || [];
			const productColorName = product.informations?.colorList.map(color => color.toLowerCase()) || [];
			const productWeightName = product.informations?.weightList.map(weight => weight.toLowerCase()) || [];

			const isCategoryMatch = this._matchesFilter(productCategoriesName, formValues.category);
			const isTagMatch = this._matchesFilter(productTagsName, formValues.tag);
			const isColorMatch = this._matchesFilter(productColorName, formValues.color);
			const isWeightMatch = this._matchesFilter(productWeightName, formValues.weight);

			const isPriceMatch =
				formValues.price?.length === 2 &&
				product.priceDetails.priceDiscount >= formValues.price[0] &&
				product.priceDetails.priceDiscount <= formValues.price[1];

			return isCategoryMatch && isTagMatch && isColorMatch && isWeightMatch && isPriceMatch;
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

	private _matchesFilter(item: string[], filterValues?: string[]) {
		return !filterValues?.length || filterValues.some(value => item.includes(value.toLowerCase()));
	}
}
