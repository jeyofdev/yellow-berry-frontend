import { MenuItem } from 'primeng/api';

export class NavigationLink implements Partial<MenuItem> {
	constructor(
		public label: string,
		public icon: string,
		public command?: () => void,
	) {}
}
