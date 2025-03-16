import { MenuItem } from 'primeng/api';

export class HeaderAccountLink implements Partial<MenuItem> {
	constructor(
		public label: string,
		public sublabel: string,
		public icon: string,
		public command?: () => void,
	) {}
}
