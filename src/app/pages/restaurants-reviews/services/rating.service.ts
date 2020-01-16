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
export class RatingService {
  maxRating: number = 5;
  fullCirclesArray: any[] = [];
  semiCirclesArray: any[] = [];
  emptyCirclesArray: any[] = [];

  /**
   * Set how many circle to display for the rating
   * It must be use an array to use ngFor in the vue
   * @param rating : number
   */
  setCirclesNumber(rating) {
    // Number
    this.fullCirclesArray = [];
    this.semiCirclesArray = [];
    this.emptyCirclesArray = [];

    if (rating === 0) this.emptyCirclesArray = [5, 5, 5, 5, 5];
    else if (Number.isInteger(rating)) {
      const fullCirclesNumber = rating;
      const emptyCirclesNumber = this.maxRating - fullCirclesNumber;
      this.semiCirclesArray = [];

      while (this.fullCirclesArray.length < fullCirclesNumber) {
        this.fullCirclesArray.push(fullCirclesNumber);
      }

      while (this.emptyCirclesArray.length < emptyCirclesNumber) {
        this.emptyCirclesArray.push(emptyCirclesNumber);
      }
    } else {
      let integerRating = Math.floor(rating);
      const decimalsRating = rating - integerRating;
      let fullCirclesNumber = integerRating;
      let semiCirclesNumber = 0;
      if (decimalsRating >= 0.3 && decimalsRating <= 0.7) {
        semiCirclesNumber = 1;
        this.semiCirclesArray.push(1);
      } else if (decimalsRating > 0.7) fullCirclesNumber++;
      const emptyCirclesNumber =
        this.maxRating - (fullCirclesNumber + semiCirclesNumber);
      this.fullCirclesArray.forEach((_, i) => {
        if (_ <= rating) this.fullCirclesArray.push(i);
      });
      while (this.fullCirclesArray.length < fullCirclesNumber) {
        this.fullCirclesArray.push(fullCirclesNumber);
      }
      while (this.emptyCirclesArray.length < emptyCirclesNumber) {
        this.emptyCirclesArray.push(emptyCirclesNumber);
      }
      while (this.semiCirclesArray.length < semiCirclesNumber) {
        this.semiCirclesArray.push(semiCirclesNumber);
      }
    }
  }
}
