import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RestaurantsComponent } from './pages/restaurants-reviews/restaurants.component';
import { GoogleMapComponent } from './pages/restaurants-reviews/components/googleMapRestaurants/googleMap.component';
import { RestaurantsListComponent } from './pages/restaurants-reviews/components/restaurantsList/restaurantsList.component';
import { RestaurantsFilterComponent } from './pages/restaurants-reviews/components/restaurantsFilter/restaurantsFilter.component';
import { NpnSliderModule } from 'npn-slider';
import { RatingBarComponent } from './pages/restaurants-reviews/components/ratingBar/ratingBar.component';
import { ReviewFormComponent } from './pages/restaurants-reviews/components/reviewForm/reviewForm.component';
import { ModalComponent } from './pages/restaurants-reviews/components/modal/modal.component';
import { CommentsComponent } from './pages/restaurants-reviews/components/comments/comments.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    RestaurantsComponent,
    GoogleMapComponent,
    RestaurantsListComponent,
    RestaurantsFilterComponent,
    RatingBarComponent,
    CommentsComponent,
    ReviewFormComponent,
    ModalComponent,
  ],
  imports: [BrowserModule, NpnSliderModule, FormsModule],
  providers: [],
  bootstrap: [RestaurantsComponent],
})
export class AppModule {}
