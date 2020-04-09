import { Component, Input } from '@angular/core';
import { RatingService } from '../../services/rating.service';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'rating-bar',
  templateUrl: './ratingBar.component.html',
  styleUrls: ['./ratingBar.component.styl'],
})
export class RatingBarComponent {
  @Input() rating: number;
  ratingBar: object;
  constructor(private ratingService: RatingService) {}
  ngOnInit() {
    this.ratingBar = this.ratingService.setRatingIcons(this.rating);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.ratingBar = this.ratingService.setRatingIcons(
      changes.rating.currentValue,
    );
  }
}
