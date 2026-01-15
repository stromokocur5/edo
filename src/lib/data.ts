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
    id: 'kosice',
    name: 'Košice',
    lat: 48.7209,
    lng: 21.2581,
    places: [
      { id: '4', name: 'Tabačka Kulturfabrik', category: 'culture', description: 'Nezávislé kultúrne centrum v starej tabakovej továrni.', lat: 48.7290, lng: 21.2550, tags: ['Koncerty', 'Komunita'] },
      { id: '5', name: 'Šálka Kávy', category: 'coffee', description: 'Legendárna káva v srdci mesta.', lat: 48.7220, lng: 21.2560, tags: ['Ráno', 'Koláče'] },
      { id: '6', name: 'Dóm svätej Alžbety', category: 'culture', description: 'Najväčší kostol na Slovensku a pýcha mesta.', lat: 48.7200, lng: 21.2575, tags: ['História', 'Gotika'] },
      { id: '7', name: 'Spievajúca fontána', category: 'culture', description: 'Ikonická fontána hrajúca melódie v centre.', lat: 48.7210, lng: 21.2570, tags: ['Relax', 'Hudba'] },
      { id: '8', name: 'Hrnčiarska ulica', category: 'culture', description: 'Ulička remesiel s neopakovateľnou atmosférou.', lat: 48.7230, lng: 21.2590, tags: ['Remeslá', 'Prechádzka'] },
      { id: '9', name: 'Republika Východu', category: 'food', description: 'Originálne bistro s lokálnym východniarskym temperamentom.', lat: 48.7215, lng: 21.2565, tags: ['Jedlo', 'Východ'] }
    ]
  },
  {
    id: 'secovce',
    name: 'Sečovce',
    lat: 48.7046,
    lng: 21.6624,
    places: [
      { id: '10', name: 'Kostol Nanebovzatia Panny Márie', category: 'culture', description: 'Významná historická sakrálna pamiatka mesta.', lat: 48.7040, lng: 21.6620, tags: ['História', 'Kostol'] },
      { id: '11', name: 'Mestský park', category: 'nature', description: 'Zelená oáza v centre mesta vhodná na oddych.', lat: 48.7050, lng: 21.6610, tags: ['Príroda', 'Oddych'] },
      { id: '12', name: 'Pamätník oslobodenia', category: 'culture', description: 'Miesto pripomínajúce históriu oslobodenia.', lat: 48.7035, lng: 21.6630, tags: ['História', 'Pamiatka'] },
      { id: '13', name: 'LokaL Café', category: 'coffee', description: 'Útulná kaviareň s modernou atmosférou.', lat: 48.7045, lng: 21.6615, tags: ['Káva', 'Pohoda'] }
    ]
  }
];
