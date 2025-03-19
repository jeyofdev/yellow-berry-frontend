import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FaqResponse } from '@models/faq/faq-response.model';
import { SuccessResponse } from '@models/response/success-response.model';
import { FaqService } from '@services/faq.service';
import { AccordionComponent } from '@shared/components/ui/accordion/accordion.component';
import { BreadcrumbComponent } from '@shared/components/ui/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '@shared/components/ui/header/header/header.component';
import { LayoutContentComponent } from '@shared/components/ui/layout/layout-content/layout-content.component';
import { ImageModule } from 'primeng/image';
import { map } from 'rxjs';

@Component({
	selector: 'app-faq-page',
	imports: [HeaderComponent, LayoutContentComponent, ImageModule, BreadcrumbComponent, AccordionComponent],
	templateUrl: './faq-page.component.html',
	styleUrl: './faq-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqPageComponent implements OnInit {
	public faqItems: WritableSignal<FaqResponse[]> = signal([]);
	public activePanel: number | null = null;

	private _faqService: FaqService = inject(FaqService);

	ngOnInit(): void {
		this._faqService
			.findAll()
			.pipe(
				map((faqResponse: SuccessResponse<FaqResponse[]>) => {
					this.faqItems.set(faqResponse.result);
				}),
			)
			.subscribe();
	}

	public togglePanel(panelIndex: number): void {
		this.activePanel = this.activePanel === panelIndex ? null : panelIndex;
	}
}
