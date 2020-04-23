// /// <reference types="@types/googlemaps" />
import { Component, Input } from '@angular/core';
import { RestaurantInterface } from '../../interfaces/restaurant';
import { RestaurantsService } from '../../services/restaurants.service';

@Component({
  selector: 'restaurants-filter',
  templateUrl: './restaurantsFilter.component.html',
  styleUrls: ['./restaurantsFilter.component.styl'],
})
export class RestaurantsFilterComponent {
  constructor(private restaurantsService: RestaurantsService) {}
  filterRestaurants(selectedValues: number[]): void {
    this.restaurantsService.filterRestaurantsToDisplay(
      selectedValues[0],
      selectedValues[1],
    );
    this.restaurantsService.deleteMarkers();
    this.restaurantsService.createRestaurantsMarkers();
  }
}
