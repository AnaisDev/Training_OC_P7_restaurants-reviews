import { Injectable } from '@angular/core';
import { defaultRestaurants } from '../data/defaultRestaurants';
import { RestaurantInterface } from '../interfaces/restaurant';
import { Marker } from '../interfaces/marker';
import { GoooglePosition } from '../interfaces/googlePosition';
import { Review } from '../interfaces/review';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  constructor() {}

  map: google.maps.Map;
  service: google.maps.places.PlacesService;
  restaurants: RestaurantInterface[];
  restaurantsToDisplay: RestaurantInterface[];
  restaurantsMarkers: any[] = [];
  reviewFormModal: string;

  async initRestaurantsMap(position: GoooglePosition, mapElmt: HTMLElement) {
    this.createMap(mapElmt, position.lat, position.lng);
    this.createUserMarker(position);
    try {
      await this.fetchRestaurants(position);
      this.createRestaurantsMarkers();
    } catch (e) {
      console.error('Error fetchRestaurants() : ', e);
    }
  }

  createRestaurantsMarkers() {
    if (!this.restaurantsToDisplay || this.restaurantsToDisplay.length === 0)
      return;
    this.restaurantsToDisplay.forEach(restaurant => {
      const marker = this.createMarker(
        { lat: restaurant.lat, lng: restaurant.long },
        restaurant.name,
      );
      this.restaurantsMarkers.push(marker);
    });
  }

  deleteMarkers() {
    this.restaurantsMarkers.forEach(marker => {
      marker.setMap(null);
    });
  }

  getRestaurants(): RestaurantInterface[] {
    return this.restaurants;
  }

  getRatingsAverage(restaurant: RestaurantInterface): Number {
    if (restaurant.reviews.length === 0) return 0;
    const sumRatingStars = restaurant.reviews.reduce((acc, review) => {
      return acc + review.rating;
    }, 0);
    const average = sumRatingStars / restaurant.reviews.length;
    return Math.round(average * 10) / 10;
  }

  filterRestaurantsToDisplay(min: number, max: number): RestaurantInterface[] {
    if (!this.restaurants) return;
    this.restaurantsToDisplay = this.restaurants.filter(restaurant => {
      const ratingsAverage = this.getRatingsAverage(restaurant);
      return ratingsAverage >= min && ratingsAverage <= max;
    });
  }

  getRestaurantsToDisplay(): RestaurantInterface[] {
    return this.restaurantsToDisplay;
  }

  displayReviewForm(restaurantId) {
    this.reviewFormModal = restaurantId;
  }

  private createMap(mapElement: HTMLElement, lat: number, lng: number): void {
    this.map = new google.maps.Map(mapElement, {
      center: { lat, lng },
      zoom: 10,
    });
  }

  private createMarker(
    position: object,
    title: string,
    icon?: string,
  ): google.maps.Marker {
    let marker: Marker = {
      position,
      map: this.map,
      title,
    };
    if (icon) marker.icon = icon;
    return new google.maps.Marker(marker);
  }

  private createUserMarker(position) {
    const personImg: string = 'assets/person.png';
    this.createMarker(position, 'Vous êtes ici', personImg);
  }

  private async fetchRestaurants(
    position: object,
  ): Promise<RestaurantInterface[]> {
    const request: object = {
      location: position,
      radius: '10000',
      type: ['restaurant'],
    };
    this.service = new google.maps.places.PlacesService(this.map);

    return new Promise((resolve, reject) => {
      this.service.nearbySearch(request, async (results, status) => {
        if (status !== 'OK') {
          this.restaurants = defaultRestaurants;
        } else {
          const googleRestaurants = await Promise.all(
            results.map(
              async (
                r: google.maps.places.PlaceResult,
              ): Promise<RestaurantInterface> => {
                let reviews: Review[];
                try {
                  reviews = await this.detailsGoogleRestaurant(r, this.service);
                } catch (e) {
                  reviews = [];
                }
                return {
                  id: r.id,
                  name: r.name,
                  lat: r.geometry.location.lat(),
                  long: r.geometry.location.lng(),
                  reviews,
                };
              },
            ),
          );
          this.restaurants = googleRestaurants.concat(defaultRestaurants);
        }

        this.restaurantsToDisplay = this.restaurants;
        console.log(this.restaurantsToDisplay);
        resolve(this.restaurantsToDisplay);
      });
    });
  }

  private async detailsGoogleRestaurant(
    restaurant: google.maps.places.PlaceResult,
    googleService: google.maps.places.PlacesService,
  ): Promise<Review[]> {
    return new Promise((resolve, reject) => {
      const requestRestaurantDetails: any = {
        placeId: restaurant.place_id,
        fields: ['reviews'],
      };

      let reviews: Review[] = [];
      googleService.getDetails(
        requestRestaurantDetails,
        async (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            reviews = await Promise.all(
              results.reviews.map(
                async (review: any): Promise<Review> => {
                  return { rating: review.rating, comment: review.text };
                },
              ),
            );
            resolve(reviews);
          } else {
            reject([]);
          }
        },
      );
    });
  }
}
