import { Component, InputSignal, OutputEmitterRef, OutputRef, input, output, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';

@Component({
	selector: 'app-drawer-cart',
	imports: [DrawerModule],
	templateUrl: './drawer-cart.component.html',
	styleUrl: './drawer-cart.component.scss',
})
export class DrawerCartComponent {
	public isVisible: InputSignal<boolean> = input<boolean>(false);

	public close: OutputEmitterRef<boolean> = output();

	public onClose(): void {
		this.close.emit(false);
	}
}
