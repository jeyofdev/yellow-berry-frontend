import { FormControl } from '@angular/forms';

export class FormProductFilters {
	constructor(public cat: FormControl<string[]>) {}
}
