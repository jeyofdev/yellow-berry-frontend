import { Comment } from '@models/comment/comment.model';

export class SaveCommentRequest extends Comment {
	constructor(
		public override rating: number,
		public override body: string,
	) {
		super(rating, body);
	}
}
