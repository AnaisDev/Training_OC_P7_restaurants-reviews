import { Component, Input } from '@angular/core';
import { ReviewInterface } from '../../interfaces/review';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.styl'],
})
export class CommentsComponent {
  @Input() reviews: ReviewInterface[];
  @Input() restaurantId: string;
}
