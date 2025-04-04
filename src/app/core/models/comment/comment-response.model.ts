import { Comment } from '@models/comment/comment.model';
import { ProfileDetailsResponse } from '@models/profile/profile-details-response.model';

export class CommentResponse extends Comment {
	constructor(
		public id: string,
		public override rating: number,
		public override body: string,
		public profile: ProfileDetailsResponse,
	) {
		super(rating, body);
	}
}
