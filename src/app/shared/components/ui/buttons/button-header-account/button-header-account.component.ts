import { Component, InputSignal, OnInit, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-button-header-account',
	imports: [RouterModule, ButtonModule, ImageModule],
	templateUrl: './button-header-account.component.html',
})
export class ButtonHeaderAccountComponent implements OnInit {
	public label: InputSignal<string> = input.required<string>();
	public sublabel: InputSignal<string> = input.required<string>();
	public redirectTo: InputSignal<string> = input<string>('');
	public imgNameFile: InputSignal<string> = input.required<string>();

	public imgSrc!: string;

	private _router: Router = inject(Router);

	ngOnInit(): void {
		this.imgSrc = 'icons/' + this.imgNameFile() + '.svg';
	}

	onClick(): void {
		if (this.redirectTo()) {
			this._router.navigateByUrl(this.redirectTo());
		}
	}
}
