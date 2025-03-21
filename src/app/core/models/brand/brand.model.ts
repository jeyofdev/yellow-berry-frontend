import { ColorEnum } from '@enum/color.enum';

export class Brand {
	constructor(
		public id: string,
		public name: string,
		public color: ColorEnum,
	) {}
}
