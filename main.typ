// --- GLOBÁLNE NASTAVENIA ---
#set page(
  paper: "a4",
  margin: (left: 3.5cm, right: 2.5cm, top: 2.5cm, bottom: 2.5cm),
  numbering: "1",
)

// --- TYPOGRAFIA ---
#set text(
  font: "Times New Roman",
  weight: 400, 
  lang: "sk", 
  size: 12pt
)

#show strong: set text(weight: 700)

#show raw: set text(font: "Liberation Mono", size: 0.95em, weight: 400)
#show raw.where(block: true): block.with(
  fill: luma(245),
  inset: 12pt,
  radius: 5pt,
  stroke: luma(200) + 0.5pt,
)

#set par(
  leading: 1.5em, 
  first-line-indent: 1.25cm,
  justify: true
)

// --- ŠTÝLY NADPISOV ---
#show heading.where(level: 1): it => {
  pagebreak(weak: true)
  v(35pt)
  set text(size: 16pt, weight: 700) 
  if it.numbering != none {
    text[#counter(heading).display()] 
    h(0.5em)
  }
  it.body
  v(20pt)
}

#show heading.where(level: 2): it => {
  set text(size: 14pt, weight: 700)
  v(1.2em)
  if it.numbering != none {
    text[#counter(heading).display()] 
    h(0.5em)
  }
  it.body
  v(0.8em)
}

// --- 1. TITULNÁ STRANA ---
#page(numbering: none)[
  #align(center)[
    #text(size: 14pt, weight: 400)[#upper[Stredná odborná škola techniky a služieb]] \
    #text(size: 12pt)[Kollárova 17, Sečovce]
    
    #v(4cm)
    #line(length: 60%, stroke: 1pt + black)
    #v(0.5cm)
    
    #text(size: 13pt)[PRAKTICKÁ ČASŤ ODBORNEJ ZLOŽKY MATURITNEJ SKÚŠKY] \
    #v(0.2cm)
    #text(size: 13pt)[OBHAJOBA VLASTNÉHO PROJEKTU]
    #v(1cm)
    #text(size: 22pt, weight: 700, fill: rgb(50, 50, 50))[Interaktívna webová stránka]
    
    #v(0.5cm)
    #line(length: 60%, stroke: 1pt + black)
    #v(2cm)
    
    #text(size: 14pt)[Študijný odbor: 2561 M informačné a sieťové technológie]
  ]
  
  #v(1fr)
  
  #grid(
    columns: (1fr, 1fr),
    align(left)[
      *Sečovce* \
      *2026*
    ],
    align(right)[
      *Autor:* Eduard Popaďák \
      *Konzultant:* Ing. Pavel Novotný
    ]
  )
]

// --- 2. ČESTNÉ VYHLÁSENIE ---
#pagebreak()
#heading(level: 2, numbering: none)[Čestné vyhlásenie]
#v(2cm)

Vyhlasujem, že celú prácu „Interaktívna webová stránka“ som vypracoval samostatne, s použitím uvedenej literatúry. Som si vedomý zákonných dôsledkov, ak v nej uvedené údaje nie sú pravdivé.

#v(3cm)

V Sečovciach, dňa 6. 2. 2026 
#h(1fr)
#box(width: 7cm, align(center)[
  #v(1em)
  #line(length: 100%, stroke: 0.5pt + black)
  vlastnoručný podpis
])

// --- 3. POĎAKOVANIE ---
#pagebreak()
#heading(level: 2, numbering: none)[Poďakovanie]
#v(2cm)

Na tomto mieste chcem poďakovať konzultantovi Ing. Pavlovi Novotnému za pripomienky a odbornú pomoc pri vypracovaní práce, ktorú si nesmierne vážim.

// --- 4. OBSAH ---
#pagebreak()
#outline(
  title: "Obsah",
  indent: auto,
  depth: 3
)

// --- 5. ÚVOD ---
#pagebreak()
#heading(level: 1, numbering: none)[Úvod]

Lokálne navštevovanie sa výrazne presúva do digitálneho priestoru. Turisti aj miestni obyvatelia preto hľadajú prehľadný prístup k zaujímavým miestach vo svojom okolí. Touto prácou sa venujeme vývoju webovej stránky prostredníctvom interaktívnej mapy, ktorá má pomôcť turistom a obyvateľom na základe interaktívnej mapy vyhľadať si vo svojom meste pamiatky alebo len obyčajné posedenie pri káve.

Všimli sme si, že súčasný trend cestovania poukazuje na rastúci dopyt po jednoduchých miestach, kde ľudia vyhľadávajú všetky typy informácií na jednom mieste. “Zastaralé“ riešenia ako Facebookove skupiny, papierové brožúry alebo roztrúsené príspevky na sociálnych sieťach už nestíhajú modernej dobe. Chýba jedno miesto, ktoré by prepájalo údaje o reštauráciách, parkoch či športových alebo kultúrnych podujatiach do jednoduchej a interaktívnej formy.

Práca vznikla ako nápad vytvoriť stránku, ktorá bude slúžiť ako digitálny sprievodca zaujímavých miest v rôznych mestách. Stránka má umožniť jednoduchú orientáciu v meste vďaka interaktívnej mape s možnosťou filtrovania obsahu podľa kategórií. Význam riešenia tejto práce sa sústredí na podporu lokálneho cestovného ruchu a zjednodušenie vyhľadávania obyvateľom miest.

Dokumentácia je písaná tak, aby poskytla prehľadný pohľad na celý proces vývoja stránky. Cieľom úvodu je uviesť čitateľa do vývoju modernej webovej stránky s využitím mapového podkladu. Práca vysvetľuje, prečo sme zvolili framework Next.js spolu s adaptérom OpenNext, ktorý umožňuje nasadenie na Cloudflare, čo zabezpečuje rýchle načítanie a nízke prevádzkové náklady.

// --- JADRO PRÁCE ---
#counter(heading).update(0)

= Cieľ práce

Naším hlavným cieľom práce bolo vytvoriť kreatívnu jednoduchú stránku, ktorá bude slúžiť ako digitálny sprievodca lokálnymi zaujímavosťami a poskytuje zaujímavé informácie o lokalitách v meste vďaka využitiu interaktívnej mapy.

Na splnenie hlavného cieľa sme si stanovili nasledujúce vedľajšie ciele:
- *Analýza existujúcich riešení:* Zmapovať súčasné zaujímavostí v mestách a definovať vloženie informácií.
- *Návrh architektúry:* Navrhnúť databázovú schému pre ukladanie geografických údajov.
- *Návrh používateľského rozhrania:* Dôraz na intuitivitu a jednoduchosť ovládania.
- *Vloženie interaktívnej mapy:* Využitie Next.js a open-source mapových knižníc.
- *Vývoj systému filtrovania:* Možnosť triedenia bodov podľa kategórií.
- *Optimalizácia a nasadenie:* Využitie edge computing infraštruktúry Cloudflare.

= Metodika práce

V tejto kapitole charakterizujeme náš postup pri vytváraní interaktívneho sprievodcu. Skúmanie zahŕňalo proces návrhu a implementácie s dôrazom na minimalistický dizajn. Na začiatku sme zanalyzovali požiadavky a vyhľadali dostupné technológie vhodné pre vývoj rýchlej jednostránkovej aplikácie (SPA).

Následne sme pristúpili k návrhu architektúry a definovaniu dátového modelu. Pri vývoji sme uplatnili modulárny prístup. Dáta o bodoch záujmu (súradnice, popisy) sme získali manuálnym prieskumom lokalít a uložili ich v štruktúrovanej forme TypeScript rozhraní priamo v zdrojovom kóde. Geografické podklady sú čerpané z platformy OpenStreetMap.

= Teoretický rozbor a technologický stack

V tejto kapitole rozoberáme technológie, ktoré tvoria základ aplikácie, od evolúcie webových architektúr až po prácu s geodátami.

== Architektúra SPA a Next.js
Zvolili sme architektúru *Single Page Application (SPA)*. Na rozdiel od tradičných webov sa pri SPA načíta len jeden HTML dokument a zmeny obsahu prebiehajú dynamicky pomocou JavaScriptu. To zabezpečuje plynulý prechod medzi mestami bez preblikávania stránky. Framework *Next.js* sme doplnili o *App Router*, čo nám umožnilo efektívne smerovanie a hybridné vykresľovanie (kombinácia Server-Side a Client-Side Renderingu).



== Typová bezpečnosť a React
Celý projekt je postavený na jazyku *TypeScript*, ktorý vďaka striktným rozhraniam (interfaces) znižuje chybovosť. Jadrom rozhrania je knižnica *React*, ktorá využíva *Virtuálny DOM* na efektívnu aktualizáciu zobrazenia. Pri zmene filtra alebo mesta React porovná virtuálnu kópiu so skutočnosťou a prekreslí len nevyhnutné časti, čím šetrí výkon zariadenia.

= Implementácia a vizuálny dizajn

Táto kapitola sa sústredí na praktické nasadenie technológií pri tvorbe mapy a používateľského prostredia.

== Integrácia mapy a geoinformatika
Práca s mapou vyžaduje systém mapových dlaždíc (tiles). Integráciu zabezpečuje knižnica *Leaflet* v spojení s *OpenStreetMap (OSM)*. Pre určovanie polohy využívame globálny štandard *WGS-84*. Mapa je responzívna a umožňuje plynulý zoom a posun, pričom body záujmu sú vykresľované ako interaktívne značky.



#figure(
  rect(width: 80%, height: 6cm, fill: luma(240), stroke: 1pt + luma(150))[
    #align(center + horizon)[*Obr. 1: Mapa mesta Košice v aplikácii*]
  ],
  caption: [Ukážka mapového podkladu s bodmi záujmu]
)

== Vizuálna identita cez Tailwind CSS
Pre štýlovanie sme zvolili *Tailwind CSS* (Utility-First prístup). To nám umožnilo rýchlo vytvoriť moderné prvky ako *Glassmorphism* (polopriehľadné panely) a zabezpečiť plnú responzivitu pre mobilné zariadenia. Ikonografia z knižnice *Lucide React* pomáha používateľovi okamžite rozpoznať kategórie (napr. kaviareň, park) bez nutnosti čítania textu.

= Praktická časť

V tejto kapitole popíšem čo všetko som robil pri vytváraní projektu — ako je projekt usporiadaný, ako fungujú jednotlivé časti, a ako som to celé nasadil na internet.

== Štruktúra projektu

Projekt je organizovaný podľa konvencií frameworku Next.js s využitím App Routera. Adresárová štruktúra zabezpečuje prehľadné oddelenie logických celkov:

```
edo/
├── src/
│   ├── app/           # Stránky a layouty
│   ├── components/    # Znovupoužiteľné komponenty
│   ├── lib/           # Pomocné funkcie a dáta
│   └── db/            # Databázová vrstva
├── public/            # Statické súbory
└── wrangler.jsonc     # Konfigurácia Cloudflare
```

Hlavný priečinok `src/app` obsahuje všetky stránky aplikácie. Súbor `page.tsx` predstavuje hlavnú vstupnú stránku, zatiaľ čo priečinok `admin` obsahuje kompletné administračné rozhranie. Priečinok `api` zabezpečuje serverové koncové body pre komunikáciu s databázou.

Priečinok `components` obsahuje dva kľúčové mapové komponenty: `Map.tsx` pre verejnú časť aplikácie a `AdminMap.tsx` pre administračné rozhranie s možnosťou výberu súradníc kliknutím.

== Hlavná aplikácia

Hlavná časť aplikácie je v súbore `page.tsx`. Má asi 320 riadkov kódu a stará sa o všetko čo vidí bežný návštevník.

=== Správa stavu aplikácie

Aplikácia využíva React hooks pre správu lokálneho stavu:

```typescript
const [activeCityId, setActiveCityId] = useState(initialCityId);
const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
const [searchQuery, setSearchQuery] = useState('');
const [mobileView, setMobileView] = useState<'map' | 'list'>('list');
```

Stav `activeCityId` určuje aktuálne zobrazené mesto. Stav `activeCategory` umožňuje filtrovanie bodov záujmu podľa kategórií (káva, jedlo, príroda, kultúra). Stav `selectedPlace` uchováva aktuálne vybrané miesto pre zobrazenie detailu. Stav `searchQuery` obsahuje vyhľadávací dotaz a `mobileView` prepína medzi zobrazením zoznamu a mapy na mobilných zariadeniach.

=== Synchronizácia s URL

Dôležitou funkciou je synchronizácia stavu aplikácie s URL parametrami. To umožňuje zdieľanie odkazov na konkrétne nastavenia filtra:

```typescript
useEffect(() => {
  const params = new URLSearchParams();
  if (activeCityId) params.set('city', activeCityId);
  if (activeCategory !== 'all') params.set('cat', activeCategory);
  router.replace(`?${params.toString()}`, { scroll: false });
}, [activeCityId, activeCategory, router]);
```

Používateľ môže zdieľať odkaz v tvare `?city=kosice&cat=coffee` a príjemca uvidí rovnaké nastavenie filtrov.

=== Filtrovanie bodov záujmu

Filtrovanie využíva hook `useMemo` pre optimalizáciu výkonu:

```typescript
const filteredPlaces = useMemo(() => {
  let places = activeCity.places;
  if (activeCategory !== 'all') 
    places = places.filter(p => p.category === activeCategory);
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    places = places.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  return places;
}, [activeCity, activeCategory, searchQuery]);
```

Vyhľadávanie prehľadáva názov, popis aj tagy každého miesta, čo zabezpečuje komplexné výsledky.

== Mapový komponent

Súbor `Map.tsx` má 155 riadkov a zobrazuje mapu s bodmi záujmu.

=== Dynamický import

Knižnica Leaflet vyžaduje prístup k objektu `window`, ktorý nie je dostupný na serveri. Preto využívame dynamický import s vypnutým SSR:

```typescript
const MapComponent = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div>Načítavam mapu...</div>
});
```

=== Vlastné ikony značiek

Pre každú kategóriu sme implementovali vlastné farebné ikony využívajúce knižnicu Lucide React:

```typescript
const createCustomIcon = (category: Category, isSelected: boolean) => {
  let color = '#3b82f6';
  let IconComponent = Navigation;

  switch (category) {
    case 'coffee': color = '#8E5E3D'; IconComponent = Coffee; break;
    case 'food': color = '#F97316'; IconComponent = Utensils; break;
    case 'nature': color = '#10B981'; IconComponent = Trees; break;
    case 'culture': color = '#8B5CF6'; IconComponent = Drama; break;
  }
  
  const iconMarkup = renderToStaticMarkup(
    <div style={{
      backgroundColor: color,
      width: isSelected ? 48 : 32,
      height: isSelected ? 48 : 32,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <IconComponent size={isSelected ? 24 : 18} />
    </div>
  );

  return L.divIcon({ html: iconMarkup, className: 'custom-marker' });
};
```

Vybraná značka je väčšia a má vyššiu hodnotu z-indexu, čím vystupuje pred ostatnými.

=== Plynulé animácie mapy

Pri výbere miesta alebo zmene mesta mapa plynulo animuje prechod pomocou metódy `flyTo`:

```typescript
useEffect(() => {
  if (selectedPlaceId) {
    const place = places.find(p => p.id === selectedPlaceId);
    if (place) {
      map.flyTo([place.lat, place.lng], 15, { duration: 1 });
    }
  }
}, [selectedPlaceId, places, map]);
```

=== Geolokácia používateľa

Komponent `LocationMarker` umožňuje používateľovi zobraziť svoju aktuálnu polohu:

```typescript
const handleLocate = () => {
  map.locate().on("locationfound", function (e) {
    setPosition(e.latlng);
    map.flyTo(e.latlng, map.getZoom());
  });
};
```

Po kliknutí na tlačidlo "Moja poloha" prehliadač požiada o povolenie prístupu k GPS a následne vycentruje mapu na polohu používateľa.

== Dátový model

Všetky údaje o mestách a miestach sú v súbore `data.ts` (462 riadkov).

=== Typy v TypeScripte

Aby sme mali prehľad čo aké dáta má obsahovať, používame TypeScript rozhrania:

```typescript
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
```

=== Aktuálne údaje

Aplikácia aktuálne obsahuje dáta pre dve mestá:
- *Košice:* 26 bodov záujmu (6 kaviarní, 4 reštaurácie, 5 prírodných miest, 11 kultúrnych pamiatok)
- *Sečovce:* 16 bodov záujmu (2 kaviarne, 5 reštaurácií, 1 prírodné miesto, 8 kultúrnych pamiatok)

Celkovo aplikácia eviduje 42 bodov záujmu s kompletnými informáciami vrátane súradníc, popisov a obrázkov.

== Administračné rozhranie

Na pridávanie a úpravu miest slúži admin panel na adrese `/admin`. Vďaka nemu netreba upravovať kód pri pridávaní nových miest. Celkovo má admin panel asi 700 riadkov kódu.

=== Ako je admin panel postavený

Admin panel má spoločný layout pre všetky stránky. V `layout.tsx` je definovaná štruktúra:

```typescript
export default function AdminLayout({ children }: AdminLayoutProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        fetch('/api/auth')
            .then((res) => {
                if (res.ok) {
                    setIsAuthenticated(true);
                } else {
                    router.push('/admin/login');
                }
            });
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <aside className="fixed w-64 bg-white dark:bg-gray-800">
                {/* Navigácia */}
            </aside>
            <main className="lg:ml-64">
                {children}
            </main>
        </div>
    );
}
```

Layout má bočný panel s navigáciou. Na mobile je navigácia schovaná a ukáže sa po kliknutí na hamburger menu.

=== Prihlásenie

Do adminu sa treba prihlásiť heslom. Prihlasovacia stránka vyzerá celkom moderne:

```typescript
export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push('/admin');
        } else {
            setError('Nesprávne heslo');
        }
    };
}
```

Prihlasovacia stránka obsahuje:
- *Pole pre heslo* s možnosťou zobraziť/skryť zadávané znaky
- *Vizuálna spätná väzba* pri nesprávnom hesle
- *Loading indikátor* počas overovania
- *Gradient pozadie* s polotransparentnou kartou

=== Dashboard a štatistiky

Hlavná stránka administrácie (`/admin/page.tsx`) zobrazuje prehľadový dashboard s nasledujúcimi informáciami:

```typescript
const stats = {
    total: places.length,
    coffee: places.filter(p => p.category === 'coffee').length,
    food: places.filter(p => p.category === 'food').length,
    nature: places.filter(p => p.category === 'nature').length,
    culture: places.filter(p => p.category === 'culture').length,
};
```

Dashboard obsahuje:
- *Štatistické karty* — celkový počet miest a rozdelenie podľa kategórií
- *Filtrovanie podľa mesta* — tlačidlá pre rýchle filtrovanie
- *Zoznam miest* — interaktívny zoznam s možnosťou úpravy
- *Tlačidlo pre pridanie* — rýchly prístup k formuláru pre nové miesto

Každá položka v zozname zobrazuje ikonu kategórie, názov, popis a súradnice. Kliknutím sa administrátor dostane na stránku úpravy daného miesta.

=== Formulár pre pridanie nového miesta

Stránka `/admin/places/new` obsahuje komplexný formulár s 323 riadkami kódu. Formulár je rozdelený do logických sekcií:

*1. Základné informácie:*
```typescript
const [form, setForm] = useState({
    name: '',
    cityId: '',
    category: 'coffee' as Category,
    description: '',
    lat: null as number | null,
    lng: null as number | null,
    tags: '',
    image: '',
    googleMapsLink: '',
});
```

*2. Výber kategórie:*
Kategória sa vyberá pomocou vizuálnych tlačidiel s ikonami. Každá kategória má svoju farbu:
- Káva — hnedá
- Jedlo — oranžová
- Príroda — zelená
- Kultúra — fialová

*3. Interaktívna mapa pre výber súradníc:*
Pre presný výber polohy sme implementovali špecializovaný komponent `AdminMap.tsx`:

```typescript
export default function AdminMap({
    lat, lng, onLocationSelect, defaultCenter
}: AdminMapProps) {
    const hasPosition = lat !== null && lng !== null;

    return (
        <MapContainer center={center} zoom={hasPosition ? 15 : 13}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/..." />
            <MapClickHandler onLocationSelect={onLocationSelect} />
            {hasPosition && (
                <Marker
                    position={[lat, lng]}
                    draggable={true}
                    eventHandlers={{
                        dragend: (e) => {
                            const position = e.target.getLatLng();
                            onLocationSelect(position.lat, position.lng);
                        },
                    }}
                />
            )}
        </MapContainer>
    );
}
```

Mapa umožňuje dva spôsoby výberu súradníc:
- *Kliknutie na mapu* — jednoduché umiestnenie značky
- *Presun značky* — jemné doladenie polohy ťahaním

Pod mapou sa zobrazujú aktuálne súradnice s presnosťou na 6 desatinných miest.

*4. Médiá:*
- URL obrázka (typicky z Unsplash)
- Voliteľný odkaz na Google Maps

*5. Validácia a odoslanie:*
```typescript
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.lat || !form.lng) {
        setError('Vyber pozíciu na mape');
        return;
    }

    const res = await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: `place-${Date.now()}`,
            cityId: form.cityId,
            name: form.name,
            category: form.category,
            description: form.description,
            lat: form.lat,
            lng: form.lng,
            tags: form.tags.split(',').map(t => t.trim()),
            image: form.image,
        }),
    });
};
```

=== Úprava existujúceho miesta

Stránka `/admin/places/[id]` načíta existujúce údaje a predvyplní formulár. Administrátor môže upraviť akékoľvek pole a zmeny uložiť. Stránka tiež obsahuje tlačidlo pre vymazanie miesta s potvrdením.

=== API koncové body

Serverové rozhranie je implementované v priečinku `api` pomocou Next.js Route Handlers:

```
/api/auth
  - GET:    Overenie prihlásenia (kontrola session)
  - POST:   Prihlásenie (overenie hesla)
  - DELETE: Odhlásenie (vymazanie session)

/api/cities
  - GET:    Zoznam všetkých miest

/api/places
  - GET:    Zoznam všetkých bodov záujmu
  - POST:   Vytvorenie nového miesta

/api/places/[id]
  - GET:    Detail konkrétneho miesta
  - PUT:    Úprava existujúceho miesta
  - DELETE: Vymazanie miesta
```

=== Responzívny dizajn admin panelu

Administračné rozhranie je plne responzívne:

*Desktop (šírka > 1024px):*
- Fixný bočný panel s navigáciou
- Široký obsahový priestor

*Tablet a mobil (šírka < 1024px):*
- Skrytý bočný panel
- Hamburger menu v hlavičke
- Vysúvacie navigačné menu
- Prekryvná vrstva pri otvorenom menu

```typescript
<aside className={clsx(
    'fixed w-64 transform transition-transform lg:translate-x-0',
    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
)}>
```

=== Bezpečnosť

Admin panel má niekoľko ochranných prvkov:

- *Session autentifikácia* — pri každom požiadavke sa kontroluje či je používateľ prihlásený
- *Chránené stránky* — bez prihlásenia vás hodí na login
- *Validácia vstupov* — kontrola či sú vyplnené povinné polia

== Responzívny dizajn

Stránka funguje na mobile aj na počítači.

=== Desktop rozloženie

Na zariadeniach s šírkou nad 768 pixelov sa zobrazuje rozdelené rozloženie:
- *Ľavý panel (450px):* Ovládacie prvky, vyhľadávanie a zoznam miest
- *Pravá časť:* Interaktívna mapa zaberajúca zvyšok obrazovky

=== Mobilné rozloženie

Na mobilných zariadeniach sa zobrazuje vždy len jedna časť:
- *Prepínacie tlačidlá:* Plávajúca lišta v spodnej časti obrazovky
- *Zoznam:* Celostránkové zobrazenie bodov záujmu
- *Mapa:* Celostránková mapa s detailom vo forme spodného panelu (bottom sheet)

```typescript
const [mobileView, setMobileView] = useState<'map' | 'list'>('list');
```

Pri výbere miesta zo zoznamu sa na mobile automaticky prepne na zobrazenie mapy s detailom.

== Tmavý režim

Aplikácia podporuje automatický tmavý režim na základe systémových nastavení:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
    --brand-light: #111827;
    --brand-dark: #F9FAFB;
    --surface: #1F2937;
  }
}
```

Všetky komponenty využívajú CSS premenné a Tailwind triedy s prefixom `dark:`, čím sa zabezpečuje konzistentný vzhľad v oboch režimoch.

== Nasadenie na Cloudflare

Aplikáciu som nasadil na Cloudflare Workers pomocou OpenNext adaptéra.

=== Konfigurácia

Súbor `wrangler.jsonc` definuje nastavenia pre Cloudflare:

```jsonc
{
  "name": "kam-v-tvojom-meste",
  "compatibility_date": "2024-01-01",
  "main": ".open-next/worker.js",
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  }
}
```

=== Proces nasadenia

Nasadenie prebieha v dvoch krokoch:

1. *Build:* Príkaz `opennextjs-cloudflare build` vytvorí optimalizovaný balík
2. *Deploy:* Príkaz `opennextjs-cloudflare deploy` nahrá aplikáciu na Cloudflare

Celý proces je automatizovaný v npm skripte:

```bash
npm run deploy
```

=== Výhody edge computing

Nasadenie na Cloudflare Workers prináša niekoľko výhod:
- *Nízka latencia:* Aplikácia beží v datacentrách blízko používateľov (230+ lokalít globálne)
- *Vysoká dostupnosť:* Automatická replikácia a load balancing
- *Nízke náklady:* Platíte len za skutočné použitie, nie za rezervovanú kapacitu
- *Bezpečnosť:* Automatická ochrana pred DDoS útokmi

== Databáza Cloudflare D1

Na ukladanie dát používame *Cloudflare D1*, čo je taká cloudová databáza postavená na SQLite. Je priamo napojená na Cloudflare Workers, takže všetko beží pohromade.

=== Čo je Cloudflare D1

Cloudflare D1 je pomerne nová služba (vyšla v roku 2023). Je to v podstate SQL databáza v cloude. Oproti klasickým databázam má tieto výhody:

- *Beží na edge:* Databáza je replikovaná blízko používateľov
- *Využíva SQLite:* Osvedčený a výkonný databázový engine
- *Nevyžaduje správu serverov:* Plne spravovaná služba
- *Integruje sa s Workers:* Natívne bindings pre jednoduchý prístup

=== Konfigurácia D1

V súbore `wrangler.jsonc` definujeme pripojenie k databáze:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "kam-v-tvojom-meste-db",
      "database_id": "3b7825c4-7627-436d-827c-d071b1855e84"
    }
  ]
}
```

Binding `DB` sprístupňuje databázu v kóde aplikácie. `database_id` je jedinečný pre každú D1 inštanciu.

=== Databázová schéma

Schéma je definovaná v súbore `schema.sql` a obsahuje dve hlavné tabuľky:

```sql
-- Tabuľka miest
CREATE TABLE IF NOT EXISTS cities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Tabuľka bodov záujmu
CREATE TABLE IF NOT EXISTS places (
  id TEXT PRIMARY KEY,
  city_id TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('coffee', 'food', 'nature', 'culture')),
  description TEXT NOT NULL,
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  tags TEXT NOT NULL,
  image TEXT NOT NULL,
  google_maps_link TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);

-- Indexy pre rýchlejšie vyhľadávanie
CREATE INDEX IF NOT EXISTS idx_places_city ON places(city_id);
CREATE INDEX IF NOT EXISTS idx_places_category ON places(category);
```

Schéma používa pár užitočných funkcií SQLite:
- *CHECK* — kontroluje či kategória je jedna z povolených
- *Foreign key* — prepojenie miest s mestami
- *Kaskádové mazanie* — keď zmažem mesto, zmažú sa aj jeho miesta
- *Časové značky* — automaticky ukladá kedy bolo miesto vytvorené
- *Indexy* — zrýchľujú vyhľadávanie

=== TypeScript typy pre databázu

Pre typovú bezpečnosť definujeme rozhrania v súbore `types.ts`:

```typescript
// Štruktúra záznamu v databáze
export interface DbPlace {
    id: string;
    city_id: string;
    name: string;
    category: 'coffee' | 'food' | 'nature' | 'culture';
    description: string;
    lat: number;
    lng: number;
    tags: string; // JSON string
    image: string;
    google_maps_link: string | null;
    created_at: string;
    updated_at: string;
}

// Aplikačný formát s parsovanými tagmi
export interface Place {
    id: string;
    cityId: string;
    name: string;
    category: 'coffee' | 'food' | 'nature' | 'culture';
    description: string;
    lat: number;
    lng: number;
    tags: string[];
    image: string;
    googleMapsLink?: string;
}
```

Konverzná funkcia transformuje databázový záznam na aplikačný formát:

```typescript
export function dbPlaceToPlace(dbPlace: DbPlace): Place {
    return {
        id: dbPlace.id,
        cityId: dbPlace.city_id,
        name: dbPlace.name,
        category: dbPlace.category,
        description: dbPlace.description,
        lat: dbPlace.lat,
        lng: dbPlace.lng,
        tags: JSON.parse(dbPlace.tags),
        image: dbPlace.image,
        googleMapsLink: dbPlace.google_maps_link || undefined,
    };
}
```

=== Seedovanie databázy

Pre naplnenie databázy počiatočnými dátami slúži skript `seed.ts`:

```typescript
export function generateSeedSQL(): string {
    const statements: string[] = [];

    for (const city of CITIES_DATA) {
        statements.push(`
            INSERT OR REPLACE INTO cities (id, name, lat, lng) 
            VALUES ('${city.id}', '${city.name}', ${city.lat}, ${city.lng});
        `);

        for (const place of city.places) {
            const tagsJson = JSON.stringify(place.tags);
            statements.push(`
                INSERT OR REPLACE INTO places (...) VALUES (...);
            `);
        }
    }

    return statements.join('\n');
}
```

Skript vytvorí SQL príkazy z dát ktoré máme v kóde. Spustenie:

```bash
# Lokálne testovanie
npx wrangler d1 execute kam-v-tvojom-meste-db --local --file=./src/db/seed.sql

# Produkčná databáza
npx wrangler d1 execute kam-v-tvojom-meste-db --file=./src/db/seed.sql
```

=== Prístup k databáze v API

V Next.js Route Handlers pristupujeme k D1 cez Cloudflare environment:

```typescript
import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET() {
    const { env } = getRequestContext();
    const db = env.DB;

    const { results } = await db
        .prepare('SELECT * FROM places WHERE city_id = ?')
        .bind(cityId)
        .all();

    return Response.json({ places: results.map(dbPlaceToPlace) });
}
```

D1 používa prepared statements, takže je chránená pred SQL injection útokmi.

=== Prečo sme si vybrali D1

D1 sme si vybrali z týchto dôvodov:

- Všetko beží na jednom mieste (Cloudflare)
- Je rýchla lebo dáta sú blízko používateľov
- Sama sa škáluje podľa potreby
- Jednoduché spúšťanie SQL cez príkazový riadok
- Má free tier s 5 miliónmi čítaní mesačne

== Optimalizácie výkonu

Snažili sme sa aby aplikácia bola čo najrýchlejšia.

=== Lazy loading obrázkov

Všetky obrázky využívajú komponent `next/image` s automatickým lazy loadingom:

```typescript
<Image
  src={place.image}
  alt={place.name}
  fill
  className="object-cover"
/>
```

Obrázky sa načítavajú až keď sa priblížia k viditeľnej časti obrazovky.

=== Memoizácia výpočtov

Filtrovanie bodov využíva `useMemo` hook, čím sa predchádza zbytočným prepočtom:

```typescript
const filteredPlaces = useMemo(() => {
  // filtrovacia logika
}, [activeCity, activeCategory, searchQuery]);
```

Výpočet sa vykoná len keď sa zmení niektorá zo závislostí.

=== Turbopack v development režime

Počas vývoja využívame Turbopack pre rýchlejšie hot reloading:

```bash
npm run dev   # Spúšťa: next dev --turbopack
```

Turbopack je nový bundler napísaný v jazyku Rust, ktorý je výrazne rýchlejší než webpack.

== Testovanie a ladenie

Počas vývoja sme aplikáciu priebežne testovali na rôznych zariadeniach a prehliadačoch.

=== Manuálne testovanie

Testovali sme nasledujúce scenáre:
- Prepínanie medzi mestami a kontrola správneho načítania bodov
- Filtrovanie podľa kategórií a vyhľadávanie
- Klikanie na značky na mape a zobrazenie detailu
- Navigácia do Google Maps
- Responzívne správanie na rôznych veľkostiach obrazovky
- Funkčnosť tmavého režimu
- Geolokácia používateľa

=== Testované prehliadače

Aplikácia bola otestovaná v nasledujúcich prostrediach:
- Google Chrome (desktop a Android)
- Mozilla Firefox (desktop)
- Safari (iOS a macOS)
- Microsoft Edge (desktop)

=== Známe obmedzenia

Počas testovania sme identifikovali nasledujúce obmedzenia:
- Geolokácia vyžaduje HTTPS a povolenie používateľa
- Niektoré staršie prehliadače nemusia podporovať všetky CSS vlastnosti
- Veľké množstvo značiek na mape môže spomaliť slabšie zariadenia

// --- POUŽITÁ LITERATÚRA ---
#pagebreak()
#heading(level: 1, numbering: none)[Zoznam použitej literatúry]

1. Next.js Documentation. [online]. Dostupné na: https://nextjs.org/docs
2. React - A JavaScript library for building user interfaces. [online]. Dostupné na: https://react.dev
3. Leaflet - an open-source JavaScript library for interactive maps. [online]. Dostupné na: https://leafletjs.com
4. Tailwind CSS Documentation. [online]. Dostupné na: https://tailwindcss.com/docs
5. OpenNext - Serverless adapter for Next.js. [online]. Dostupné na: https://opennext.js.org
6. Cloudflare Workers Documentation. [online]. Dostupné na: https://developers.cloudflare.com/workers
7. TypeScript Documentation. [online]. Dostupné na: https://www.typescriptlang.org/docs
8. OpenStreetMap - The Free Wiki World Map. [online]. Dostupné na: https://www.openstreetmap.org