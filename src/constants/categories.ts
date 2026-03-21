import type { PlaceCategory, PlaceTag } from '@/src/types/place';

type CategoryConfig = {
  key: PlaceCategory;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;
  tag?: PlaceTag;
};

export const categories: CategoryConfig[] = [
  {
    key: 'attractions',
    title: 'Atrakcije',
    shortTitle: 'Atrakcije',
    description: 'Tvrđave, muzeji i mjesta po kojima se grad pamti.',
    icon: 'compass-outline',
    color: '#0D5E73',
    tag: 'culture',
  },
  {
    key: 'religious',
    title: 'Manastiri i crkve',
    shortTitle: 'Crkve',
    description: 'Mirna mjesta nasljeđa, pogleda i istorije.',
    icon: 'business-outline',
    color: '#523A36',
    tag: 'religious',
  },
  {
    key: 'beaches',
    title: 'Plaže',
    shortTitle: 'Plaže',
    description: 'Kupanje, sunce i jutarnje ili večernje šetnje uz more.',
    icon: 'sunny-outline',
    color: '#4BA4A6',
    tag: 'beach',
  },
  {
    key: 'restaurants',
    title: 'Restorani',
    shortTitle: 'Restorani',
    description: 'Mjesta za ručak, večeru i duže sjedenje uz pogled.',
    icon: 'restaurant-outline',
    color: '#D18458',
    tag: 'food',
  },
  {
    key: 'cafes',
    title: 'Kafići',
    shortTitle: 'Kafići',
    description: 'Kafa, kolači i kratki predah tokom dana.',
    icon: 'cafe-outline',
    color: '#7A5B4E',
    tag: 'food',
  },
  {
    key: 'nightlife',
    title: 'Noćni život',
    shortTitle: 'Noćni',
    description: 'Barovi, klubovi i mjesta koja rade kasnije.',
    icon: 'moon-outline',
    color: '#16263A',
    tag: 'nightlife',
  },
  {
    key: 'viewpoints',
    title: 'Vidikovci',
    shortTitle: 'Vidikovci',
    description: 'Tačke za najbolji pogled na zaliv i stari grad.',
    icon: 'eye-outline',
    color: '#24595F',
    tag: 'viewpoint',
  },
  {
    key: 'family',
    title: 'Porodične aktivnosti',
    shortTitle: 'Porodica',
    description: 'Lagane ideje za porodice, djecu i opušten dan.',
    icon: 'people-outline',
    color: '#C27E52',
    tag: 'family',
  },
  {
    key: 'nearbyTrips',
    title: 'Izleti u blizini',
    shortTitle: 'Izleti',
    description: 'Mjesta koja vrijedi obići izvan samog centra grada.',
    icon: 'map-outline',
    color: '#0E5F73',
    tag: 'trip',
  },
  {
    key: 'festivals',
    title: 'Festivali',
    shortTitle: 'Festivali',
    description: 'Kulturni događaji, koncerti i tradicionalne proslave.',
    icon: 'musical-notes-outline',
    color: '#A74A3F',
    tag: 'festival',
  },
  {
    key: 'shopping',
    title: 'Kupovina',
    shortTitle: 'Kupovina',
    description: 'Tržnice, suveniri i lokalni proizvodi.',
    icon: 'bag-outline',
    color: '#D9B379',
    tag: 'shopping',
  },
  {
    key: 'practical',
    title: 'Praktično',
    shortTitle: 'Praktično',
    description: 'Turističke info, bolnica, apoteka, policija, autobuska.',
    icon: 'information-circle-outline',
    color: '#1E7A5B',
    tag: 'practical',
  },
];

export const categoryByKey = Object.fromEntries(categories.map((category) => [category.key, category]));
