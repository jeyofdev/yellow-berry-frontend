import { Component, InputSignal, OnInit, input } from '@angular/core';

@Component({
	selector: 'app-section-subtitle',
	imports: [],
	templateUrl: './section-subtitle.component.html',
	styleUrl: './section-subtitle.component.scss',
})
export class SectionSubtitleComponent {
	public content: InputSignal<string> = input.required<string>();
	public fontSize: InputSignal<string> = input<string>('text-sm');
	public color: InputSignal<string> = input<string>('text-gray-500');
	public lineHeight: InputSignal<string> = input<string>('leading-[1.125rem]');
	public fontWeight: InputSignal<string> = input<string>('font-light');
	public textAlign: InputSignal<string> = input<string>('text-center');
	public fontFamily: InputSignal<string> = input<string>('font-poppins');
	public marginTop: InputSignal<string> = input<string>('mt-0');
	public maxWidth: InputSignal<string> = input<string>('max-w-none');
}
