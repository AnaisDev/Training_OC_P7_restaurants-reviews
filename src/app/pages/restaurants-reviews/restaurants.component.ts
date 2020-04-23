import { Component, ViewChild } from '@angular/core';
import { RestaurantInterface } from './interfaces/restaurant';
import { GoogleMapComponent } from './components/googleMapRestaurants/googleMap.component';
@Component({
  selector: 'rr-root',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.styl'],
})
export class RestaurantsComponent {
  @ViewChild(GoogleMapComponent) map;
  title = 'AVIS DE RESTAURANTS';
}
