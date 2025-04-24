import { Component, Signal, WritableSignal, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BrandResponse } from '@models/brand/brand-response.model';
import { HeroWithTitleFormatted } from '@models/hero/hero-with-title-formated.model';
import { Hero } from '@models/hero/hero.model';
import { ProductResponse } from '@models/product/product-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { FilterService } from '@services/components/filter.service';
import { ProductService } from '@services/product.service';
import { BannerComponent } from '@shared/components/ui/banner/banner.component';
import { CarouselBrandComponent } from '@shared/components/ui/carousel/carousel-brand/carousel-brand.component';
import { CarouselHeroComponent } from '@shared/components/ui/carousel/carousel-hero/carousel-hero.component';
import { CarouselProductComponent } from '@shared/components/ui/carousel/carousel-product/carousel-product.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { map } from 'rxjs';

@Component({
	selector: 'app-home-page',
	imports: [
		HeaderComponent,
		LayoutContentComponent,
		CarouselHeroComponent,
		ImageModule,
		ChipModule,
		CarouselBrandComponent,
		CarouselProductComponent,
		BannerComponent,
	],
	templateUrl: './home-page.component.html',
	styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
	private _filterService: FilterService = inject(FilterService);
	public brandList: Signal<BrandResponse[]> = this._filterService.brandList;
	private _productService: ProductService = inject(ProductService);

	public productList: Signal<ProductResponse[]> = this._getProductList();

	private heroItems: Hero[] = [
		{ subtitle: 'Flat 30% Off', title: 'Explore Healthy & Fresh Fruits' },
		{ subtitle: 'Flat 20% Off', title: 'Explore Warm Fast Food & Snacks' },
		{ subtitle: 'Flat 20% Off', title: 'Explore Organic & Fresh Vegetables' },
	];

	private heroItemsFormated: HeroWithTitleFormatted[] = this.heroItems.map(item => {
		const titleArr = item.title.split(' ');

		const first = titleArr[0];
		const second = titleArr.slice(1, 2).join(' ');
		const third = titleArr.slice(2).join(' ');

		return {
			...item,
			title: {
				first,
				second,
				third,
			},
		};
	});

	public heroItemList: Signal<HeroWithTitleFormatted[]> = signal(this.heroItemsFormated);

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

	private _getProductList(): Signal<ProductResponse[]> {
		return toSignal(
			this._productService
				.findAll()
				.pipe(map((productResponse: SuccessResponse<ProductResponse[]>) => productResponse.result)),
			{ initialValue: [] },
		);
	}
}
