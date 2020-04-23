import { ReviewInterface } from '../interfaces/review';

export class Review implements ReviewInterface {
  public rating: number;
  public comment = '';
}
