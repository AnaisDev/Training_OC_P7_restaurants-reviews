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
  displayRestaurantComments: string;
  displayOrCloseComments(id: string) {
    if (this.displayRestaurantComments === id) {
      this.displayRestaurantComments = '';
    } else this.displayRestaurantComments = id;
  }
}
