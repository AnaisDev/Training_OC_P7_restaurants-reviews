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
  staticStreetViewUrl: string = '';

  displayOrCloseRestaurantDetails(restaurant: RestaurantInterface) {
    this.staticStreetViewUrl = this.restaurantsService.fetchStreetViewUrl(
      restaurant.lat,
      restaurant.long,
    );
    console.log(' this.staticStreetViewUrl', this.staticStreetViewUrl);
    if (this.displayRestaurantDetails === restaurant.id) {
      this.displayRestaurantDetails = '';
    } else this.displayRestaurantDetails = restaurant.id;
  }
}
