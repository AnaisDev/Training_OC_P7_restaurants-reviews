import { Component, Input } from '@angular/core';
import { GooglePosition } from '../../interfaces/googlePosition';
import { RestaurantsService } from '../../services/restaurants.service';

@Component({
  selector: 'static-street-view',
  templateUrl: './staticStreetView.component.html',
  styleUrls: ['./staticStreetView.component.styl'],
})
export class StaticStreetViewComponent {
  @Input() staticStreetViewUrl: string;

  constructor(private restaurantsService: RestaurantsService) {}

  async ngOnInit(): Promise<void> {}
}
