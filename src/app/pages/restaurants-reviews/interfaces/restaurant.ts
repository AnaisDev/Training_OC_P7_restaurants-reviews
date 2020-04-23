import { ReviewInterface } from './review';

export interface RestaurantInterface {
  id: string;
  name: string;
  address?: string;
  lat: number;
  long: number;
  reviews: ReviewInterface[];
}
/*

googleRestaurant
{
  "geometry": {
    "location": {},
    "viewport": {
      "Za": {
        "i": 47.9233613197085,
        "j": 47.9260592802915
      },
      "Ua": {
        "i": 106.8999360197085,
        "j": 106.9026339802915
      }
    }
  },
  "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
  "id": "c82c36f361572dcf2202bb621e43ee70bc4cd254",
  "name": "Premium Hotel Ulaanbaatar",
  "opening_hours": {},
  "photos": [
    {
      "height": 5772,
      "html_attributions": [
        "<a href=\"https://maps.google.com/maps/contrib/100541985848416140072\">Premium Hotel Ulaanbaatar</a>"
      ],
      "width": 4000
    }
  ],
  "place_id": "ChIJUS8XcF-Sll0REtCbJVbRcz8",
  "plus_code": {
    "compound_code": "WWF2+WC Oulan-Bator, Mongolie",
    "global_code": "8PV8WWF2+WC"
  },
  "rating": 4.2,
  "reference": "ChIJUS8XcF-Sll0REtCbJVbRcz8",
  "scope": "GOOGLE",
  "types": [
    "night_club",
    "lodging",
    "bar",
    "restaurant",
    "food",
    "point_of_interest",
    "establishment"
  ],
  "user_ratings_total": 202,
  "vicinity": "Ikh Toiruu Street, Chingeltei District-5, Ulaanbaatar",
  "html_attributions": []
}
  */
