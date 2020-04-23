import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RestaurantsComponent } from './pages/restaurants-reviews/restaurants.component';
import { GoogleMapComponent } from './pages/restaurants-reviews/components/googleMapRestaurants/googleMap.component';
import { RestaurantsListComponent } from './pages/restaurants-reviews/components/restaurantsList/restaurantsList.component';
import { RestaurantsFilterComponent } from './pages/restaurants-reviews/components/restaurantsFilter/restaurantsFilter.component';
import { NpnSliderModule } from 'npn-slider';
import { RatingBarComponent } from './pages/restaurants-reviews/components/ratingBar/ratingBar.component';
import { CommentsComponent } from './pages/restaurants-reviews/components/comments/comments.component';
@NgModule({
  declarations: [
    RestaurantsComponent,
    GoogleMapComponent,
    RestaurantsListComponent,
    RestaurantsFilterComponent,
    RatingBarComponent,
    CommentsComponent,
  ],
  imports: [BrowserModule, NpnSliderModule],
  providers: [],
  bootstrap: [RestaurantsComponent],
})
export class AppModule {}
