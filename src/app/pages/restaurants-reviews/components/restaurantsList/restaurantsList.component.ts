// /// <reference types="@types/googlemaps" />
import { Component, Input } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { RestaurantInterface } from '../../interfaces/restaurant';
@Component({
  selector: 'restaurants-list',
  templateUrl: './restaurantsList.component.html',
  styleUrls: ['./restaurantsList.component.styl'],
})
export class RestaurantsListComponent {
  constructor(private restaurantsService: RestaurantsService) {}
  rating: number;
  displayRestaurantDetails: string;
  async displayOrCloseRestaurantDetails(restaurant: RestaurantInterface) {
    await this.restaurantsService.fetchStreetView(
      restaurant.lat,
      restaurant.long,
    );
    if (this.displayRestaurantDetails === restaurant.id) {
      this.displayRestaurantDetails = '';
    } else this.displayRestaurantDetails = restaurant.id;
  }
}
