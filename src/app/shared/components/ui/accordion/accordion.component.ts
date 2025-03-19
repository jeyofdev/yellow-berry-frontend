import { Component, InputSignal, input } from '@angular/core';
import { FaqResponse } from '@models/faq/faq-response.model';
import { AccordionModule } from 'primeng/accordion';

@Component({
	selector: 'app-accordion',
	imports: [AccordionModule],
	templateUrl: './accordion.component.html',
	styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
	public items: InputSignal<FaqResponse[]> = input.required<FaqResponse[]>();
}
