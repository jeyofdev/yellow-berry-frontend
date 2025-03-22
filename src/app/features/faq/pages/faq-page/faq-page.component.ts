import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
})
export class FaqPageComponent {
	private _faqService: FaqService = inject(FaqService);

	public faqItems: Signal<FaqResponse[]> = this.getFaqItemList();

	public activePanel: number | null = null;

	public togglePanel(panelIndex: number): void {
		this.activePanel = this.activePanel === panelIndex ? null : panelIndex;
	}

	private getFaqItemList(): Signal<FaqResponse[]> {
		return toSignal(
			this._faqService.findAll().pipe(map((faqResponse: SuccessResponse<FaqResponse[]>) => faqResponse.result)),
			{ initialValue: [] },
		);
	}
}
