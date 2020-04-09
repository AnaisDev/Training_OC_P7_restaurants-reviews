// /// <reference types="@types/googlemaps" />
import { Component } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { NavigatorPosition } from '../../interfaces/navigatorPosition';
import { GooglePosition } from '../../interfaces/googlePosition';
@Component({
  selector: 'google-map',
  templateUrl: './googleMap.component.html',
  styleUrls: ['./googleMap.component.styl'],
})
export class GoogleMapComponent {
  latitude: number = 47.9184676;
  longitude: number = 106.9177016;
  position: GooglePosition = { lat: this.latitude, lng: this.longitude };
  mapElement: HTMLElement;

  constructor(private restaurantsService: RestaurantsService) {}

  async ngOnInit(): Promise<void> {
    /*this.setUserPosition();
    this.createMap();
    this.createUserMarker();*/
    await this.createRestaurantsMap();
  }

  private async createRestaurantsMap(): Promise<void> {
    this.mapElement = document.getElementById('map');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        await this.restaurantsMapWithGeolocation,
        await this.restaurantsMapWithoutGeolocation,
      );
    }
  }

  private restaurantsMapWithGeolocation = async (
    pos: NavigatorPosition,
  ): Promise<any> => {
    this.position = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    await this.restaurantsService.initRestaurantsMap(
      this.position,
      this.mapElement,
    );
  };

  private restaurantsMapWithoutGeolocation = async (
    e: object,
  ): Promise<void> => {
    await this.restaurantsService.initRestaurantsMap(
      this.position,
      this.mapElement,
    );
  };
}
