import { Tag } from '@models/tag/tag.model';

export class TagResponse extends Tag {
	constructor(
		public override id: string,
		public override name: string,
	) {
		super(id, name);
	}
}
