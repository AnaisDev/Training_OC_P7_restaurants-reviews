import { Component, ViewChild } from "@angular/core";
import { GoogleMapComponent } from "./components/googleMapRestaurants/googleMap.component";
import { RestaurantsService } from "../restaurants-reviews/services/restaurants.service";

@Component({
  selector: "rr-root",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.styl"],
})
export class RestaurantsComponent {
  @ViewChild(GoogleMapComponent) map;

  constructor(public restaurantsService: RestaurantsService) {}
  title = "AVIS DE RESTAURANTS";
}
