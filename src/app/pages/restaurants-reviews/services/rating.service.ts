import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  maxRating: number = 5;
  // fullIcons: any[] = [];
  // semiIcons: any[] = [];
  // emptyIcons: any[] = [];

  /**
   * Set how many icons to display for the rating
   * It must be use an array to use ngFor in the vue
   * @param rating : number
   */
  setRatingIcons(rating) {
    // Number
    let fullIcons = [];
    let semiIcons = [];
    let emptyIcons = [];

    if (rating === 0) emptyIcons = [5, 5, 5, 5, 5];
    else if (Number.isInteger(rating)) {
      const fullCirclesNumber = rating;
      const emptyCirclesNumber = this.maxRating - fullCirclesNumber;
      semiIcons = [];

      while (fullIcons.length < fullCirclesNumber) {
        fullIcons.push(fullCirclesNumber);
      }

      while (emptyIcons.length < emptyCirclesNumber) {
        emptyIcons.push(emptyCirclesNumber);
      }
    } else {
      let integerRating = Math.floor(rating);
      const decimalsRating = rating - integerRating;
      let fullCirclesNumber = integerRating;
      let semiCirclesNumber = 0;
      if (decimalsRating >= 0.3 && decimalsRating <= 0.7) {
        semiCirclesNumber = 1;
        semiIcons.push(1);
      } else if (decimalsRating > 0.7) fullCirclesNumber++;
      const emptyCirclesNumber =
        this.maxRating - (fullCirclesNumber + semiCirclesNumber);
      fullIcons.forEach((_, i) => {
        if (_ <= rating) fullIcons.push(i);
      });
      while (fullIcons.length < fullCirclesNumber) {
        fullIcons.push(fullCirclesNumber);
      }
      while (emptyIcons.length < emptyCirclesNumber) {
        emptyIcons.push(emptyCirclesNumber);
      }
      while (semiIcons.length < semiCirclesNumber) {
        semiIcons.push(semiCirclesNumber);
      }
    }

    return { fullIcons, semiIcons, emptyIcons };
  }
}
