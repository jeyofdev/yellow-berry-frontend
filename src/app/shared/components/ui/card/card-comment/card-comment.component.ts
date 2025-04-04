import { Component, InputSignal, input } from '@angular/core';
import { CommentResponse } from '@models/comment/comment-response.model';
import { RatingComponent } from '@shared/components/ui/rating/rating.component';
import { ImageModule } from 'primeng/image';

@Component({
	selector: 'app-card-comment',
	imports: [RatingComponent, ImageModule],
	templateUrl: './card-comment.component.html',
	styleUrl: './card-comment.component.scss',
})
export class CardCommentComponent {
	public comment: InputSignal<CommentResponse> = input.required<CommentResponse>();
}
