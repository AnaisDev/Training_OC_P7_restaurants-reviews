import { Component, Input } from '@angular/core';
import { Review } from '../../interfaces/review';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.styl'],
})
export class CommentsComponent {
  @Input() reviews: Review[];
  @Input() restaurantId: string;
}
