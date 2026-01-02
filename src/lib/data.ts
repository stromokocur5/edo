export type Category = 'coffee' | 'food' | 'nature' | 'culture';

export interface Place {
  id: string;
  name: string;
  category: Category;
  description: string;
  lat: number;
  lng: number;
  tags: string[];
}

export interface City {
  id: string;
  name: string;
  lat: number;
  lng: number;
  places: Place[];
}

export const CITIES_DATA: City[] = [
  {
    id: 'bratislava',
    name: 'Bratislava',
    lat: 48.1486,
    lng: 17.1077,
    places: [
      { id: '1', name: 'Sora', category: 'coffee', description: 'Minimalistická kaviareň so skvelým flat white.', lat: 48.1520, lng: 17.1100, tags: ['Specialty', 'Pokoj'] },
      { id: '2', name: 'SNG', category: 'culture', description: 'Novo zrekonštruovaná galéria, architektúra svetovej úrovne.', lat: 48.1405, lng: 17.1095, tags: ['Art', 'Architektúra'] },
      { id: '3', name: 'Otto!', category: 'food', description: 'Bistro s modernou kuchyňou a naturálnymi vínami.', lat: 48.1450, lng: 17.1150, tags: ['Obed', 'Víno'] },
    ]
  },
  {
    id: 'kosice',
    name: 'Košice',
    lat: 48.7209,
    lng: 21.2581,
    places: [
      { id: '4', name: 'Tabačka Kulturfabrik', category: 'culture', description: 'Nezávislé kultúrne centrum v starej tabakovej továrni.', lat: 48.7290, lng: 21.2550, tags: ['Koncerty', 'Komunita'] },
      { id: '5', name: 'Šálka Kávy', category: 'coffee', description: 'Legendárna káva v srdci mesta.', lat: 48.7220, lng: 21.2560, tags: ['Ráno', 'Koláče'] }
    ]
  }
];
