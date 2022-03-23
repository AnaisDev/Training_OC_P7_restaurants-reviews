import { Component, Input } from "@angular/core";
import { RatingBar, RatingService } from "../../services/rating.service";
import { SimpleChanges } from "@angular/core";

@Component({
  selector: "rating-bar",
  templateUrl: "./ratingBar.component.html",
  styleUrls: ["./ratingBar.component.styl"],
})
export class RatingBarComponent {
  @Input() rating: number;
  ratingBar: RatingBar;
  constructor(private ratingService: RatingService) {}
  ngOnInit() {
    this.ratingBar = this.ratingService.setRatingIcons(this.rating);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.ratingBar = this.ratingService.setRatingIcons(
      changes.rating.currentValue
    );
  }
}
