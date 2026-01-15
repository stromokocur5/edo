export type Category = 'coffee' | 'food' | 'nature' | 'culture';

export interface Place {
  id: string;
  name: string;
  category: Category;
  description: string;
  lat: number;
  lng: number;
  tags: string[];
  image: string;
  googleMapsLink?: string;
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
      {
        id: '4',
        name: 'Tabačka Kulturfabrik',
        category: 'culture',
        description: 'Nezávislé kultúrne centrum v starej tabakovej továrni.',
        lat: 48.7290,
        lng: 21.2550,
        tags: ['Koncerty', 'Komunita'],
        image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d03?auto=format&fit=crop&w=800&q=80',
        googleMapsLink: 'https://goo.gl/maps/mic'
      },
      {
        id: '5',
        name: 'Šálka Kávy',
        category: 'coffee',
        description: 'Legendárna káva v srdci mesta.',
        lat: 48.7220,
        lng: 21.2560,
        tags: ['Ráno', 'Koláče'],
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '6',
        name: 'Dóm svätej Alžbety',
        category: 'culture',
        description: 'Najväčší kostol na Slovensku a pýcha mesta.',
        lat: 48.7200,
        lng: 21.2575,
        tags: ['História', 'Gotika'],
        image: 'https://images.unsplash.com/photo-1548625361-bd8a61f2213d?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '7',
        name: 'Spievajúca fontána',
        category: 'culture',
        description: 'Ikonická fontána hrajúca melódie v centre.',
        lat: 48.7210,
        lng: 21.2570,
        tags: ['Relax', 'Hudba'],
        image: 'https://images.unsplash.com/photo-1570700003069-467dc06bea67?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '8',
        name: 'Hrnčiarska ulica',
        category: 'culture',
        description: 'Ulička remesiel s neopakovateľnou atmosférou.',
        lat: 48.7230,
        lng: 21.2590,
        tags: ['Remeslá', 'Prechádzka'],
        image: 'https://images.unsplash.com/photo-1598335624147-384ca6c67292?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '9',
        name: 'Republika Východu',
        category: 'food',
        description: 'Originálne bistro s lokálnym východniarskym temperamentom.',
        lat: 48.7215,
        lng: 21.2565,
        tags: ['Jedlo', 'Východ'],
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '14',
        name: 'Miklušova väznica',
        category: 'culture',
        description: 'Expozícia venovaná histórii mesta a trestnému právu.',
        lat: 48.7225,
        lng: 21.2595,
        tags: ['História', 'Múzeum'],
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '15',
        name: 'Jakabov palác',
        category: 'culture',
        description: 'Nádherná neogotická stavba pri Mestskom parku.',
        lat: 48.7235,
        lng: 21.2610,
        tags: ['Architektúra', 'Palác'],
        image: 'https://images.unsplash.com/photo-1546284381-8bda23321523?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '16',
        name: 'Štátne divadlo Košice',
        category: 'culture',
        description: 'Klenot divadelnej architektúry v centre mesta.',
        lat: 48.7205,
        lng: 21.2572,
        tags: ['Umenie', 'Divadlo'],
        image: 'https://images.unsplash.com/photo-1507676184212-d0370baf1220?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '17',
        name: 'Botanická záhrada UPJŠ',
        category: 'nature',
        description: 'Najstaršia botanická záhrada na Slovensku.',
        lat: 48.7350,
        lng: 21.2380,
        tags: ['Rastliny', 'Príroda'],
        image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '18',
        name: 'Zoologická záhrada Košice',
        category: 'nature',
        description: 'Najväčšia ZOO v strednej Európe v Kavečanoch.',
        lat: 48.7850,
        lng: 21.2050,
        tags: ['Zvieratá', 'Rodina'],
        image: 'https://images.unsplash.com/photo-1534567176735-8463641bd79b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '19',
        name: 'Vyhliadková veža Hradová',
        category: 'nature',
        description: 'Panoramatický výhľad na celé Košice.',
        lat: 48.7620,
        lng: 21.2410,
        tags: ['Výhľad', 'Turistika'],
        image: 'https://images.unsplash.com/photo-1449452198679-05c7fd30f416?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '20',
        name: 'Bankov',
        category: 'nature',
        description: 'Obľúbené rekreačné stredisko Košičanov.',
        lat: 48.7450,
        lng: 21.2150,
        tags: ['Les', 'Relax'],
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '21',
        name: 'Kaviareň Slávia',
        category: 'coffee',
        description: 'Secesná kaviareň s bohatou históriou.',
        lat: 48.7208,
        lng: 21.2578,
        tags: ['Luxus', 'Káva'],
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '22',
        name: 'HalmiSpace',
        category: 'culture',
        description: 'Kreatívny priestor v historickom dome.',
        lat: 48.7212,
        lng: 21.2558,
        tags: ['Komunita', 'Kaviareň'],
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '23',
        name: 'GESTO cafe & brunch',
        category: 'food',
        description: 'Moderný brunch spot s príjemnou atmosférou.',
        lat: 48.7240,
        lng: 21.2540,
        tags: ['Brunch', 'Design'],
        image: 'https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '24',
        name: 'Med Malina',
        category: 'food',
        description: 'Tradičná kuchyňa s moderným nádychom v srdci mesta.',
        lat: 48.7202,
        lng: 21.2585,
        tags: ['Tradičné', 'Jedlo'],
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '25',
        name: 'Nico Caffe',
        category: 'coffee',
        description: 'Výberová káva a skvelá atmosféra.',
        lat: 48.7228,
        lng: 21.2555,
        tags: ['Specialty', 'Atmosféra'],
        image: 'https://images.unsplash.com/photo-1463797221720-6b07e6426c24?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '35',
        name: 'Kasárne/Kulturpark',
        category: 'culture',
        description: 'Moderné kultúrne centrum s parkom.',
        lat: 48.7180,
        lng: 21.2550,
        tags: ['Kultúra', 'Koncerty'],
        image: 'https://images.unsplash.com/photo-1563584316028-2b70b3a3a8bf?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '36',
        name: 'Kino Úsmev',
        category: 'culture',
        description: 'Legendárne kino s kaviarňou a terasou.',
        lat: 48.7250,
        lng: 21.2600,
        tags: ['Film', 'Kultúra'],
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '37',
        name: 'Múzeum letectva',
        category: 'culture',
        description: 'Unikátna zbierka lietadiel pri letisku.',
        lat: 48.6700,
        lng: 21.2400,
        tags: ['História', 'Technika'],
        image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '38',
        name: 'Dolná brána',
        category: 'culture',
        description: 'Podzemné archeologické múzeum.',
        lat: 48.7190,
        lng: 21.2575,
        tags: ['História', 'Podzemie'],
        image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '39',
        name: 'Park Anička',
        category: 'nature',
        description: 'Rekreačný areál s detským ihriskom a prameňom.',
        lat: 48.7455,
        lng: 21.2500,
        tags: ['Oddych', 'Rodina'],
        image: 'https://images.unsplash.com/photo-1560625695-177ebc31e2ec?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '40',
        name: 'M CAFÉ Macarons',
        category: 'coffee',
        description: 'Kaviareň v parížskom štýle s makrónkami.',
        lat: 48.7218,
        lng: 21.2562,
        tags: ['Sladké', 'Francúzsko'],
        image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '41',
        name: 'Cardio Caffé',
        category: 'coffee',
        description: 'Výberová káva a zdravé raňajky.',
        lat: 48.7235,
        lng: 21.2550,
        tags: ['Zdravé', 'Káva'],
        image: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '42',
        name: 'Východoslovenská galéria',
        category: 'culture',
        description: 'Regionálna galéria výtvarného umenia.',
        lat: 48.7205,
        lng: 21.2585,
        tags: ['Umenie', 'Výstavy'],
        image: 'https://images.unsplash.com/photo-1518998053901-5348d3969105?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'secovce',
    name: 'Sečovce',
    lat: 48.7046,
    lng: 21.6624,
    places: [
      {
        id: '10',
        name: 'Kostol Nanebovzatia Panny Márie',
        category: 'culture',
        description: 'Gotický kostol z roku 1494.',
        lat: 48.7040,
        lng: 21.6620,
        tags: ['História', 'Kostol'],
        image: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '11',
        name: 'Starý židovský cintorín',
        category: 'culture',
        description: 'Zachovalá pamiatka na židovskú komunitu.',
        lat: 48.7060,
        lng: 21.6600,
        tags: ['História', 'Pamiatka'],
        image: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '12',
        name: 'Pomník Červenej armády',
        category: 'culture',
        description: 'Pamätník oslobodenia na námestí.',
        lat: 48.7044,
        lng: 21.6628,
        tags: ['História', 'Pamätník'],
        image: 'https://images.unsplash.com/photo-1605156553856-787be42b2b3f?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '13',
        name: 'Carmel Café',
        category: 'coffee',
        description: 'Komunitná kaviareň s kultúrnymi podujatiami.',
        lat: 48.7045,
        lng: 21.6615,
        tags: ['Komunita', 'Káva'],
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '26',
        name: 'Rímskokatolícka fara',
        category: 'culture',
        description: 'Historická budova fary.',
        lat: 48.7042,
        lng: 21.6622,
        tags: ['História', 'Relígia'],
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '27',
        name: 'Mestský štadión',
        category: 'nature',
        description: 'Športový areál Slavoj Sečovce.',
        lat: 48.7070,
        lng: 21.6580,
        tags: ['Šport', 'Futbal'],
        image: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd552?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '28',
        name: 'Reštaurácia Bohemia',
        category: 'food',
        description: 'Tradičná reštaurácia s domácou kuchyňou.',
        lat: 48.7050,
        lng: 21.6630,
        tags: ['Obed', 'Tradičné'],
        image: 'https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '29',
        name: 'Cukráreň Marlenka',
        category: 'food',
        description: 'Obľúbená cukráreň s vlastnou výrobou.',
        lat: 48.7038,
        lng: 21.6618,
        tags: ['Sladké', 'Zákusky'],
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '30',
        name: 'Grande Pizzeria',
        category: 'food',
        description: 'Pizzeria a reštaurácia s terasou.',
        lat: 48.7048,
        lng: 21.6635,
        tags: ['Pizza', 'Obed'],
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '31',
        name: 'Námestie sv. Cyrila a Metoda',
        category: 'culture',
        description: 'Centrálne námestie s parkovou úpravou.',
        lat: 48.7044,
        lng: 21.6628,
        tags: ['Centrum', 'Prechádzka'],
        image: 'https://images.unsplash.com/photo-1519331379826-f947873d78bb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '32',
        name: 'Mestská knižnica',
        category: 'culture',
        description: 'Knižnica v kultúrnom dome.',
        lat: 48.7052,
        lng: 21.6605,
        tags: ['Knihy', 'Kultúra'],
        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '33',
        name: 'Family Caffe',
        category: 'coffee',
        description: 'Kaviareň a reštaurácia pre rodiny s deťmi.',
        lat: 48.7055,
        lng: 21.6612,
        tags: ['Rodina', 'Káva'],
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '34',
        name: 'Miestne trhovisko',
        category: 'food',
        description: 'Miesto pre nákup čerstvej zeleniny a ovocia.',
        lat: 48.7030,
        lng: 21.6600,
        tags: ['Trh', 'Lokálne'],
        image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '43',
        name: 'Súsošie sv. Cyrila a Metoda',
        category: 'culture',
        description: 'Bronzové súsošie patrónov Európy.',
        lat: 48.7046,
        lng: 21.6629,
        tags: ['Pamiatka', 'História'],
        image: 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '44',
        name: 'Prícestná socha Piety',
        category: 'culture',
        description: 'Baroková kamenná socha pri kostole.',
        lat: 48.7041,
        lng: 21.6621,
        tags: ['Umenie', 'História'],
        image: 'https://images.unsplash.com/photo-1501426026826-31c6674bea5f?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '45',
        name: 'Aventador Pizza & Caffe',
        category: 'food',
        description: 'Pizza a kaviareň s moderným interiérom.',
        lat: 48.7060,
        lng: 21.6640,
        tags: ['Pizza', 'Moderné'],
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];
