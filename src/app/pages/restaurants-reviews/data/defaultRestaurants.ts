import { RestaurantInterface } from '../interfaces/restaurant';

export const defaultRestaurants: RestaurantInterface[] = [
  {
    id: 'restaurant1',
    name: 'La Veranda',
    address:
      'Veranda Restaurant, Гандан, Жамъян гүний гудамж, Oulan-Bator, Mongolie',
    lat: 47.91512711798786,
    long: 106.91735769866943,
    reviews: [
      {
        rating: 4,
        comment:
          "Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande.",
      },
      {
        rating: 5,
        comment: 'Tout simplement mon restaurant préféré !',
      },
    ],
  },
  {
    id: 'restaurant2',
    name: 'Choijin Temple Restaurant',
    address:
      'Аянчин Даун Таун Ресторан, Гандан, Олимпийн гудамж, 101, 14240, Oulan-Bator, Mongolie',
    lat: 47.915149,
    long: 106.919418,
    reviews: [
      {
        rating: 5,
        comment:
          'Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !',
      },
      {
        rating: 3,
        comment: "J'ai trouvé ça correct, sans plus",
      },
    ],
  },
  {
    id: 'restaurant3',
    name: 'Wok Pizza',
    address:
      '43, Зайсан, Чингисийн өргөн чөлөө, 13, 16030, Oulan-Bator, Mongolie',
    lat: 47.90027311943288,
    long: 106.90413977264404,
    reviews: [],
  },
  {
    id: 'restaurant4',
    name: 'Khaan Deli 120k',
    address: '17, Зайсан, Чимэд-Осорын гудамж, 210628, Oulan-Bator, Mongolie',
    lat: 47.9001019294049,
    long: 106.90671469329834,
    reviews: [
      {
        rating: 4,
        comment: "J'ai eu le burger au fromage. Le boeuf était assez bon.",
      },
    ],
  },
  {
    id: 'restaurant5',
    name: 'Modern Nomads',
    address: 'Гандан, Ерөнхий сайд Амарын гудамж, 975, Oulan-Bator, Mongolie',
    lat: 47.920312,
    long: 106.921697,
    reviews: [
      {
        rating: 5,
        comment:
          "L'ambiance du restaurant semble typique Mongole, les plats sont de qualités et les serveuses pas avares d'attentions. Tous les plats semblent typiques, et on peut retrouver sur la carte des assiettes mélangeant différentes spécialités pour en goûter plusieurs.Les prix sont très raisonnables : nous avons copieusement dîné à 3 pour un peu moins de 20€.",
      },
    ],
  },
];
