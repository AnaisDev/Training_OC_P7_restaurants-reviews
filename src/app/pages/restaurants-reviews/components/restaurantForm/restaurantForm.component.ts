import { Component, Input } from '@angular/core';
import { RestaurantInterface } from '../../interfaces/restaurant';
import { ReviewInterface } from '../../interfaces/review';
import { RestaurantsService } from '../../services/restaurants.service';
import { v4 as uuidv4 } from 'uuid';
import { Restaurant } from '../../class/restaurant';

@Component({
  selector: 'restaurant-form',
  templateUrl: './restaurantForm.component.html',
  styleUrls: ['./restaurantForm.component.styl'],
})
export class RestaurantFormComponent {
  public error: boolean = false;
  public confirmation: boolean = false;
  public messageErrors: string[];

  constructor(private restaurantsService: RestaurantsService) {}

  addRestaurant() {
    this.confirmation = false;
    this.error = false;
    this.messageErrors = [];

    // Format
    this.restaurantsService.newRestaurant.id = uuidv4();
    this.restaurantsService.newRestaurant.reviews[0].comment === undefined
      ? ''
      : this.restaurantsService.newRestaurant.reviews[0].comment;

    // Check format data :
    this.messageErrors = this.restaurantsService.returnRestaurantFormatError();
    if (this.messageErrors.length > 0) return (this.error = true);

    // Add restaurant
    this.restaurantsService.addRestaurant(
      this.restaurantsService.newRestaurant,
    );
    this.confirmation = true;

    setTimeout(() => {
      this.confirmation = false;
      this.restaurantsService.newRestaurant = new Restaurant();
      this.restaurantsService.restaurantFormModal = false;
    }, 1000);
  }
}
