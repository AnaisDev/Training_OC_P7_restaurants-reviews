// /// <reference types="@types/googlemaps" />
import { Component, Input } from '@angular/core';
import { RatingService } from '../../services/rating.service';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rating-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ratingBar.component.html',
  styleUrls: ['./ratingBar.component.styl'],
})
export class RatingBarComponent {
  @Input() rating: number;
  constructor(private ratingService: RatingService) {}
  async ngOnInit(): Promise<void> {
    this.ratingService.setCirclesNumber(this.rating);
  }
}
