import { Component, Input } from "@angular/core";
import { RestaurantInterface } from "../../interfaces/restaurant";
import { ReviewInterface } from "../../interfaces/review";
import { RestaurantsService } from "../../services/restaurants.service";

@Component({
  selector: "review-form",
  templateUrl: "./reviewForm.component.html",
  styleUrls: ["./reviewForm.component.styl"],
})
export class ReviewFormComponent {
  @Input() restaurant: RestaurantInterface;
  public review: ReviewInterface;
  public error: boolean = false;
  public confirmation: boolean = false;
  public messageError: string;

  constructor(private restaurantsService: RestaurantsService) {
    this.review = {};
  }

  buttonType = "submit";

  addRestaurantReview() {
    this.confirmation = false;
    this.error = false;

    // Format :
    this.review.comment === undefined ? "" : this.review.comment;

    // Check format data :
    const reviewFormatError = this.restaurantsService.returnReviewFormatError(
      this.review
    );
    if (reviewFormatError) {
      this.error = true;
      return (this.messageError = reviewFormatError);
    }

    // Add restaurant comment
    this.restaurantsService.addRestaurantReview(this.restaurant, this.review);
    this.confirmation = true;

    setTimeout(() => {
      this.confirmation = false;
      this.review = {};
      this.restaurantsService.reviewFormModal = "";
    }, 1000);
  }
}
