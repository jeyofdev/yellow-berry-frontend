import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { LayoutBaseComponent } from '@shared/components/ui/layout/layout-base/layout-base.component';
import { SectionSubtitleComponent } from '@shared/components/ui/section/section-subtitle/section-subtitle.component';
import { SectionTitleComponent } from '@shared/components/ui/section/section-title/section-title.component';

@Component({
	selector: 'app-layout-content',
	imports: [CommonModule, LayoutBaseComponent, SectionTitleComponent, SectionSubtitleComponent],
	templateUrl: './layout-content.component.html',
	styleUrl: './layout-content.component.scss',
})
export class LayoutContentComponent {
	public subtitle: InputSignal<string> = input<string>('');
	public pageTitleSecondary: InputSignal<string> = input<string>('');
	public pageTitlePrimary: InputSignal<string> = input<string>('');
	public pageTitleInfo: InputSignal<string> = input<string>('');
	public containerMarginTop: InputSignal<string> = input<string>('mt-0');
	public containerMarginBottom: InputSignal<string> = input<string>('mb-0');
	public childrenContainerMarginTop: InputSignal<string> = input<string>('mt-0');
	public childrenContainerMarginBottom: InputSignal<string> = input<string>('mb-0');
}
