import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { defaultRestaurants } from '../data/defaultRestaurants';
import { RestaurantInterface } from '../interfaces/restaurant';
import { Marker } from '../interfaces/marker';
import { GooglePosition } from '../interfaces/googlePosition';
import { ReviewInterface } from '../interfaces/review';
import { Restaurant } from '../class/restaurant';
import { googleApiKey } from 'envTest';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  constructor(private http: HttpClient) {}
  map: google.maps.Map;
  service: google.maps.places.PlacesService;
  restaurants: RestaurantInterface[];
  restaurantsToDisplay: RestaurantInterface[];
  restaurantsMarkers: any[] = [];
  reviewFormModal: string;
  restaurantFormModal: boolean = false;
  newRestaurant: Restaurant = new Restaurant();
  streetView: string;

  /**
   * Display google map with :
   * - user marker
   * - restaurants marker
   * - adding restaurant form onclick ont the map
   */
  async initRestaurantsMap(position: GooglePosition, mapElmt: HTMLElement) {
    this.createMap(mapElmt, position.lat, position.lng);
    this.createUserMarker(position);
    try {
      await this.fetchRestaurants(position);
      this.createRestaurantsMarkers();
    } catch (e) {
      console.error('Error fetchRestaurants() : ', e);
    }
  }

  createRestaurantsMarkers(): void {
    if (!this.restaurantsToDisplay || this.restaurantsToDisplay.length === 0)
      return;
    this.restaurantsToDisplay.forEach((restaurant) => {
      const marker = this.createMarker(
        { lat: restaurant.lat, lng: restaurant.long },
        restaurant.name,
      );
      this.restaurantsMarkers.push(marker);
    });
  }

  deleteMarkers(): void {
    this.restaurantsMarkers.forEach((marker) => {
      marker.setMap(null);
    });
  }

  getRestaurants(): RestaurantInterface[] {
    return this.restaurants;
  }

  getRatingsAverage(restaurant: RestaurantInterface): number {
    if (restaurant.reviews.length === 0) return 0;
    const sumRatingStars = restaurant.reviews.reduce((acc, review) => {
      return acc + review.rating;
    }, 0);
    const average = sumRatingStars / restaurant.reviews.length;
    return Math.round(average * 10) / 10;
  }

  filterRestaurantsAverageToDisplay(
    min: number,
    max: number,
  ): RestaurantInterface[] {
    if (!this.restaurants) return;
    this.restaurantsToDisplay = this.restaurants.filter((restaurant) => {
      const ratingsAverage = this.getRatingsAverage(restaurant);
      return ratingsAverage >= min && ratingsAverage <= max;
    });
  }

  getRestaurantsToDisplay(): RestaurantInterface[] {
    return this.restaurantsToDisplay;
  }

  /**
   To display the form to add a restaurant review
   */
  displayReviewForm(restaurantId: string): void {
    this.reviewFormModal = restaurantId;
  }

  /**
   To display the form to add a review
   */
  addRestaurantReview(
    restaurant: RestaurantInterface,
    review: ReviewInterface,
  ): void {
    const i = this.restaurants.findIndex((r) => r.id === restaurant.id);
    this.restaurants[i].reviews.push(review);
    this.restaurantsToDisplay = this.restaurants;
  }

  addRestaurant(restaurant: RestaurantInterface): void {
    this.restaurants.push(restaurant);
    this.restaurantsToDisplay = this.restaurants;
    this.createRestaurantsMarkers();
  }

  /**
   * Check user data int the add review restaurant form
   */
  returnReviewFormatError(review: ReviewInterface): string | undefined {
    const badRatingFormat =
      review.rating === undefined ||
      review.rating === null ||
      review.rating > 5 ||
      review.rating < 0;

    if (badRatingFormat)
      return 'Veuillez renseignez un nombre entre 0 et 5 pour la note.';
  }

  /**
   * Check user data int the add restaurant form
   */
  returnRestaurantFormatError(): string[] | undefined {
    const errors = [];
    const badName = this.newRestaurant.name === '';
    const badReview = this.returnReviewFormatError(
      this.newRestaurant.reviews[0],
    );
    if (badName) errors.push('Veuillez renseigner le nom du restaurant');
    if (badReview) errors.push(badReview);
    return errors;
  }

  /**
   * Return the static street view url
   */
  fetchStreetViewUrl(lat: number, lng: number): string {
    const staticStreetViewApiUrl =
      'https://maps.googleapis.com/maps/api/streetview';

    const params = new HttpParams()
      .set('key', googleApiKey)
      .set('size', '600x300')
      .set('location', `${lat}, ${lng}`);

    return `${staticStreetViewApiUrl}?${params.toString()}`;
  }

  /**
   * Create a google map
   * with adding restaurant form  on click
   */
  private createMap(mapElement: HTMLElement, lat: number, lng: number): void {
    this.map = new google.maps.Map(mapElement, {
      center: { lat, lng },
      zoom: 13,
    });
    this.map.addListener('click', (e) => {
      this.newRestaurant = new Restaurant();
      this.newRestaurant.lat = e.latLng.lat();
      this.newRestaurant.long = e.latLng.lng();
      this.restaurantFormModal = true;
    });
  }

  /**
   * Create a marker on  the map
   * with text and image
   */
  private createMarker(
    position: GooglePosition,
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

  /**
   * Create user marker on the map
   */
  private createUserMarker(position: GooglePosition): void {
    const personImg: string = 'assets/person.png';
    this.createMarker(position, 'Vous êtes ici', personImg);
  }

  /**
   * Fetch restaurants to display on the google map
   */
  private async fetchRestaurants(
    position: GooglePosition,
  ): Promise<RestaurantInterface[]> {
    const request: object = {
      location: position,
      radius: '5000',
      type: ['restaurant'],
    };
    this.service = new google.maps.places.PlacesService(this.map);

    return new Promise((resolve, reject) => {
      this.service.nearbySearch(request, async (results, status) => {
        if (status !== 'OK') {
          // If we have an error,we return default restaurants filtered according to the user's position.
          this.restaurants = this.filterRestaurantsByPosition(position);
        } else {
          // Else we search reviews foreach restaurant
          const googleRestaurants = await Promise.all(
            results.map(
              async (
                r: google.maps.places.PlaceResult,
              ): Promise<RestaurantInterface> => {
                let reviews: ReviewInterface[];
                try {
                  reviews = await this.fetchReviewsRestaurant(r, this.service);
                } catch (e) {
                  reviews = [];
                }
                // We return formated restaurant
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
          // We add the restaurants by default filtered according to the user's position
          this.restaurants = googleRestaurants.concat(
            this.filterRestaurantsByPosition(position),
          );
        }

        this.restaurantsToDisplay = this.restaurants;
        resolve(this.restaurantsToDisplay);
      });
    });
  }

  /**
   * Search reviews restaurant
   */
  private async fetchReviewsRestaurant(
    restaurant: google.maps.places.PlaceResult,
    googleService: google.maps.places.PlacesService,
  ): Promise<ReviewInterface[]> {
    return new Promise((resolve, reject) => {
      const requestRestaurantDetails: any = {
        placeId: restaurant.place_id,
        fields: ['reviews'],
      };

      let reviews: ReviewInterface[] = [];
      googleService.getDetails(
        requestRestaurantDetails,
        async (results, status) => {
          // If the googleService have sent reviews
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // We format this reviews
            (reviews = results.reviews.map(
              (review: any): ReviewInterface => {
                return { rating: review.rating, comment: review.text };
              },
            )),
              resolve(reviews);
          } else {
            reject([]);
          }
        },
      );
    });
  }

  /**
   * Filter default restaurants by position
   */
  private filterRestaurantsByPosition(
    userPosition: GooglePosition,
  ): RestaurantInterface[] {
    const latMin = userPosition.lat - 0.1;
    const latMax = userPosition.lat + 0.1;
    const lngMin = userPosition.lng - 0.5;
    const lngMax = userPosition.lng + 0.5;
    return defaultRestaurants.filter(
      (r) =>
        r.lat > latMin && r.lat < latMax && r.long > lngMin && r.long < lngMax,
    );
  }
}
