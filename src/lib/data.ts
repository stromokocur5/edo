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
      { id: '9', name: 'Republika Východu', category: 'food', description: 'Originálne bistro s lokálnym východniarskym temperamentom.', lat: 48.7215, lng: 21.2565, tags: ['Jedlo', 'Východ'] },
      { id: '14', name: 'Miklušova väznica', category: 'culture', description: 'Expozícia venovaná histórii mesta a trestnému právu.', lat: 48.7225, lng: 21.2595, tags: ['História', 'Múzeum'] },
      { id: '15', name: 'Jakabov palác', category: 'culture', description: 'Nádherná neogotická stavba pri Mestskom parku.', lat: 48.7235, lng: 21.2610, tags: ['Architektúra', 'Palác'] },
      { id: '16', name: 'Štátne divadlo Košice', category: 'culture', description: 'Klenot divadelnej architektúry v centre mesta.', lat: 48.7205, lng: 21.2572, tags: ['Umenie', 'Divadlo'] },
      { id: '17', name: 'Botanická záhrada UPJŠ', category: 'nature', description: 'Najstaršia botanická záhrada na Slovensku.', lat: 48.7350, lng: 21.2380, tags: ['Rastliny', 'Príroda'] },
      { id: '18', name: 'Zoologická záhrada Košice', category: 'nature', description: 'Najväčšia ZOO v strednej Európe v Kavečanoch.', lat: 48.7850, lng: 21.2050, tags: ['Zvieratá', 'Rodina'] },
      { id: '19', name: 'Vyhliadková veža Hradová', category: 'nature', description: 'Panoramatický výhľad na celé Košice.', lat: 48.7620, lng: 21.2410, tags: ['Výhľad', 'Turistika'] },
      { id: '20', name: 'Bankov', category: 'nature', description: 'Obľúbené rekreačné stredisko Košičanov.', lat: 48.7450, lng: 21.2150, tags: ['Les', 'Relax'] },
      { id: '21', name: 'Kaviareň Slávia', category: 'coffee', description: 'Secesná kaviareň s bohatou históriou.', lat: 48.7208, lng: 21.2578, tags: ['Luxus', 'Káva'] },
      { id: '22', name: 'HalmiSpace', category: 'culture', description: 'Kreatívny priestor v historickom dome.', lat: 48.7212, lng: 21.2558, tags: ['Komunita', 'Kaviareň'] },
      { id: '23', name: 'GESTO cafe & brunch', category: 'food', description: 'Moderný brunch spot s príjemnou atmosférou.', lat: 48.7240, lng: 21.2540, tags: ['Brunch', 'Design'] },
      { id: '24', name: 'Med Malina', category: 'food', description: 'Tradičná kuchyňa s moderným nádychom v srdci mesta.', lat: 48.7202, lng: 21.2585, tags: ['Tradičné', 'Jedlo'] },
      { id: '25', name: 'Nico Caffe', category: 'coffee', description: 'Výberová káva a skvelá atmosféra.', lat: 48.7228, lng: 21.2555, tags: ['Specialty', 'Atmosféra'] },
      { id: '35', name: 'Kasárne/Kulturpark', category: 'culture', description: 'Moderné kultúrne centrum s parkom.', lat: 48.7180, lng: 21.2550, tags: ['Kultúra', 'Koncerty'] },
      { id: '36', name: 'Kino Úsmev', category: 'culture', description: 'Legendárne kino s kaviarňou a terasou.', lat: 48.7250, lng: 21.2600, tags: ['Film', 'Kultúra'] },
      { id: '37', name: 'Múzeum letectva', category: 'culture', description: 'Unikátna zbierka lietadiel pri letisku.', lat: 48.6700, lng: 21.2400, tags: ['História', 'Technika'] },
      { id: '38', name: 'Dolná brána', category: 'culture', description: 'Podzemné archeologické múzeum.', lat: 48.7190, lng: 21.2575, tags: ['História', 'Podzemie'] },
      { id: '39', name: 'Park Anička', category: 'nature', description: 'Rekreačný areál s detským ihriskom a prameňom.', lat: 48.7455, lng: 21.2500, tags: ['Oddych', 'Rodina'] },
      { id: '40', name: 'M CAFÉ Macarons', category: 'coffee', description: 'Kaviareň v parížskom štýle s makrónkami.', lat: 48.7218, lng: 21.2562, tags: ['Sladké', 'Francúzsko'] },
      { id: '41', name: 'Cardio Caffé', category: 'coffee', description: 'Výberová káva a zdravé raňajky.', lat: 48.7235, lng: 21.2550, tags: ['Zdravé', 'Káva'] },
      { id: '42', name: 'Východoslovenská galéria', category: 'culture', description: 'Regionálna galéria výtvarného umenia.', lat: 48.7205, lng: 21.2585, tags: ['Umenie', 'Výstavy'] }
    ]
  },
  {
    id: 'secovce',
    name: 'Sečovce',
    lat: 48.7046,
    lng: 21.6624,
    places: [
      { id: '10', name: 'Kostol Nanebovzatia Panny Márie', category: 'culture', description: 'Gotický kostol z roku 1494.', lat: 48.7040, lng: 21.6620, tags: ['História', 'Kostol'] },
      { id: '11', name: 'Starý židovský cintorín', category: 'culture', description: 'Zachovalá pamiatka na židovskú komunitu.', lat: 48.7060, lng: 21.6600, tags: ['História', 'Pamiatka'] },
      { id: '12', name: 'Pomník Červenej armády', category: 'culture', description: 'Pamätník oslobodenia na námestí.', lat: 48.7044, lng: 21.6628, tags: ['História', 'Pamätník'] },
      { id: '13', name: 'Carmel Café', category: 'coffee', description: 'Komunitná kaviareň s kultúrnymi podujatiami.', lat: 48.7045, lng: 21.6615, tags: ['Komunita', 'Káva'] },
      { id: '26', name: 'Rímskokatolícka fara', category: 'culture', description: 'Historická budova fary.', lat: 48.7042, lng: 21.6622, tags: ['História', 'Relígia'] },
      { id: '27', name: 'Mestský štadión', category: 'nature', description: 'Športový areál Slavoj Sečovce.', lat: 48.7070, lng: 21.6580, tags: ['Šport', 'Futbal'] },
      { id: '28', name: 'Reštaurácia Bohemia', category: 'food', description: 'Tradičná reštaurácia s domácou kuchyňou.', lat: 48.7050, lng: 21.6630, tags: ['Obed', 'Tradičné'] },
      { id: '29', name: 'Cukráreň Marlenka', category: 'food', description: 'Obľúbená cukráreň s vlastnou výrobou.', lat: 48.7038, lng: 21.6618, tags: ['Sladké', 'Zákusky'] },
      { id: '30', name: 'Grande Pizzeria', category: 'food', description: 'Pizzeria a reštaurácia s terasou.', lat: 48.7048, lng: 21.6635, tags: ['Pizza', 'Obed'] },
      { id: '31', name: 'Námestie sv. Cyrila a Metoda', category: 'culture', description: 'Centrálne námestie s parkovou úpravou.', lat: 48.7044, lng: 21.6628, tags: ['Centrum', 'Prechádzka'] },
      { id: '32', name: 'Mestská knižnica', category: 'culture', description: 'Knižnica v kultúrnom dome.', lat: 48.7052, lng: 21.6605, tags: ['Knihy', 'Kultúra'] },
      { id: '33', name: 'Family Caffe', category: 'coffee', description: 'Kaviareň a reštaurácia pre rodiny s deťmi.', lat: 48.7055, lng: 21.6612, tags: ['Rodina', 'Káva'] },
      { id: '34', name: 'Miestne trhovisko', category: 'food', description: 'Miesto pre nákup čerstvej zeleniny a ovocia.', lat: 48.7030, lng: 21.6600, tags: ['Trh', 'Lokálne'] },
      { id: '43', name: 'Súsošie sv. Cyrila a Metoda', category: 'culture', description: 'Bronzové súsošie patrónov Európy.', lat: 48.7046, lng: 21.6629, tags: ['Pamiatka', 'História'] },
      { id: '44', name: 'Prícestná socha Piety', category: 'culture', description: 'Baroková kamenná socha pri kostole.', lat: 48.7041, lng: 21.6621, tags: ['Umenie', 'História'] },
      { id: '45', name: 'Aventador Pizza & Caffe', category: 'food', description: 'Pizza a kaviareň s moderným interiérom.', lat: 48.7060, lng: 21.6640, tags: ['Pizza', 'Moderné'] }
    ]
  }
];
