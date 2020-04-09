import { RestaurantInterface } from '../interfaces/restaurant';
import { Review } from '../class/review';

export class Restaurant implements RestaurantInterface {
  public id = '';
  public name = '';
  public lat = 0;
  public long = 0;
  public reviews = [new Review()];
}
