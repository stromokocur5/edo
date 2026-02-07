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

Vyhlasujem, že celú prácu „Interaktívna webová stránka" som vypracoval samostatne, s použitím uvedenej literatúry. Som si vedomý zákonných dôsledkov, ak v nej uvedené údaje nie sú pravdivé.

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

Všimli sme si, že súčasný trend cestovania poukazuje na rastúci dopyt po jednoduchých miestach, kde ľudia vyhľadávajú všetky typy informácií na jednom mieste. "Zastaralé" riešenia ako Facebookove skupiny, papierové brožúry alebo roztrúsené príspevky na sociálnych sieťach už nestíhajú modernej dobe. Chýba jedno miesto, ktoré by prepájalo údaje o reštauráciách, parkoch či športových alebo kultúrnych podujatiach do jednoduchej a interaktívnej formy.

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

V tejto kapitole popíšem čo všetko som robil pri vytváraní projektu — ako je projekt usporiadaný, ako fungujú jednotlivé časti, a ako som to celé nasadil na internet. Celý vývoj trval niekoľko týždňov a zahŕňal mnohé rozhodnutia o tom, aké technológie použiť a ako jednotlivé komponenty prepojiť. Snažil som sa vytvoriť aplikáciu, ktorá bude nielen funkčná, ale aj príjemná na používanie a ľahko rozšíriteľná do budúcnosti.

== Štruktúra projektu

Projekt je organizovaný podľa konvencií frameworku Next.js s využitím App Routera. Táto štruktúra je dnes považovaná za štandard v modernom webovom vývoji a prináša viacero výhod. Adresárová štruktúra zabezpečuje prehľadné oddelenie logických celkov, čo uľahčuje orientáciu v kóde a umožňuje jednoduchšiu spoluprácu viacerých vývojárov na jednom projekte.

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

Hlavný priečinok `src/app` obsahuje všetky stránky aplikácie organizované podľa URL ciest. Súbor `page.tsx` predstavuje hlavnú vstupnú stránku, ktorú používateľ vidí po načítaní webu. Priečinok `admin` obsahuje kompletné administračné rozhranie vrátane prihlasovacej stránky, dashboardu a formulárov pre správu obsahu. Priečinok `api` zabezpečuje serverové koncové body pre komunikáciu s databázou, čo je základom pre oddelenú architektúru frontendu a backendu.

Priečinok `components` obsahuje znovupoužiteľné komponenty, ktoré sa používajú na viacerých miestach aplikácie. Najdôležitejšie sú dva mapové komponenty: `Map.tsx` pre verejnú časť aplikácie, ktorý zobrazuje značky s bodmi záujmu a umožňuje interakciu s mapou, a `AdminMap.tsx` pre administračné rozhranie s možnosťou výberu súradníc kliknutím priamo na mapu. Táto separácia umožňuje nezávislé úpravy oboch komponentov bez rizika narušenia funkčnosti druhého.

Priečinok `lib` obsahuje pomocné funkcie, TypeScript typy a dátové súbory. Tu sa nachádzajú definície rozhraní pre miesta a mestá, pomocné funkcie pre formátovanie dát a konštanty používané naprieč aplikáciou. Centralizácia týchto súborov na jednom mieste znižuje duplicitu kódu a uľahčuje údržbu.

Priečinok `db` je venovaný databázovej vrstve. Obsahuje schému databázy v SQL formáte, TypeScript typy pre databázové záznamy a pomocné funkcie pre konverziu medzi databázovým a aplikačným formátom dát. Táto vrstva abstrahácie umožňuje prípadnú zmenu databázového systému v budúcnosti bez nutnosti úpravy celej aplikácie.

Priečinok `public` obsahuje statické súbory ako obrázky, fonty a ikony. Tieto súbory sú priamo dostupné cez URL a nie sú spracovávané build procesom. To je užitočné pre súbory, ktoré sa nemenia a mali by byť servírované čo najrýchlejšie.

Konfiguračný súbor `wrangler.jsonc` definuje nastavenia pre nasadenie na platformu Cloudflare Workers. Obsahuje názov projektu, prepojenie s databázou D1 a ďalšie parametre potrebné pre správne fungovanie aplikácie v produkčnom prostredí.

== Hlavná aplikácia a mapový komponent

Hlavná časť aplikácie je v súbore `page.tsx` a má približne 320 riadkov kódu. Tento súbor je srdcom celej aplikácie a spája všetky ostatné komponenty do funkčného celku. Aplikácia využíva React hooks pre správu lokálneho stavu, čo je moderný spôsob ako pracovať so stavom v React aplikáciách bez nutnosti používať komplexnejšie riešenia ako Redux alebo MobX.

Stav aplikácie zahŕňa niekoľko kľúčových premenných. Prvou je aktuálne vybrané mesto, ktoré určuje aké body záujmu sa zobrazia na mape a v zozname. Druhou je aktívna kategória, ktorá umožňuje filtrovanie bodov záujmu podľa typu — používateľ si môže vybrať či chce vidieť len kaviarne, reštaurácie, prírodné miesta alebo kultúrne pamiatky. Tretím je aktuálne vybrané miesto, ktoré sa zobrazí v detailnom náhľade s popisom, obrázkom a možnosťou navigácie. Štvrtým je vyhľadávací dotaz, ktorý umožňuje fulltextové vyhľadávanie v názvoch, popisoch a tagoch miest. Piatym je prepínač mobilného zobrazenia, ktorý určuje či sa na malom displeji zobrazuje mapa alebo zoznam.

Dôležitou funkciou je synchronizácia stavu aplikácie s URL parametrami. Keď používateľ zmení mesto alebo kategóriu, tieto zmeny sa automaticky premietnu do URL adresy. To prináša dve výhody. Po prvé, používateľ môže použiť tlačidlá späť a vpred v prehliadači pre navigáciu medzi stavmi aplikácie. Po druhé, používateľ môže skopírovať URL a poslať ju priateľovi, ktorý po otvorení odkazu uvidí presne to isté nastavenie filtrov. Napríklad odkaz v tvare `?city=kosice&cat=coffee` zobrazí kaviarne v Košiciach.

Filtrovanie bodov záujmu je optimalizované pomocou techniky memoizácie. To znamená, že výpočet filtrovaného zoznamu sa vykoná len vtedy, keď sa zmení niektorá z relevantných premenných — aktuálne mesto, kategória alebo vyhľadávací dotaz. Ak používateľ napríklad len posúva mapu bez zmeny filtrov, zoznam sa neprepočítava, čo šetrí výkon zariadenia. Vyhľadávanie prehľadáva názov miesta, jeho popis aj všetky priradené tagy, čo umožňuje nájsť miesta podľa rôznych kritérií.

Mapový komponent je umiestnený v súbore `Map.tsx` a má približne 155 riadkov kódu. Tento komponent zodpovedá za zobrazenie interaktívnej mapy s využitím knižnice Leaflet, ktorá je jednou z najpopulárnejších open-source riešení pre webové mapy. Leaflet poskytuje všetky základné funkcie ako zoom, posun, značky a popupy, ale zároveň je dostatočne flexibilný pre prispôsobenie vzhľadu a správania.

Jednou z technických výziev bolo správne načítanie knižnice Leaflet. Táto knižnica vyžaduje prístup k objektu `window`, ktorý reprezentuje okno prehliadača. Problém je, že Next.js vykresľuje stránky najprv na serveri, kde objekt `window` neexistuje. Riešením je dynamický import s vypnutým server-side renderingom. Komponent mapy sa tak načíta až na strane klienta, keď je okno prehliadača dostupné. Počas načítavania sa používateľovi zobrazí náhradný text informujúci o tom, že mapa sa práve načítava.

Pre každú kategóriu bodov záujmu sme implementovali vlastné farebné ikony. Kaviarne sú označené hnedou farbou s ikonou šálky, reštaurácie oranžovou s ikonou príboru, prírodné miesta zelenou s ikonou stromu a kultúrne pamiatky fialovou s ikonou divadla. Tento farebný systém umožňuje používateľovi okamžite na prvý pohľad rozpoznať typ miesta bez nutnosti čítania textu. Vybraná značka je navyše väčšia ako ostatné a má vyššiu prioritu zobrazenia, takže vystupuje pred ostatnými značkami aj keď sa prekrývajú.

Pri výbere miesta zo zoznamu alebo kliknutí na značku mapa plynulo animuje prechod na danú polohu. Táto animácia trvá približne jednu sekundu a využíva techniku nazývanú flyTo, ktorá kombinuje posun aj zmenu priblíženia do jedného plynulého pohybu. Podobná animácia sa spustí aj pri zmene mesta, kedy mapa prejde na stred nového mesta.

Komponent mapy tiež obsahuje funkcionalitu pre zobrazenie aktuálnej polohy používateľa. Po kliknutí na príslušné tlačidlo prehliadač požiada o povolenie prístupu k GPS údajom zariadenia. Ak používateľ súhlasí, jeho poloha sa zobrazí na mape ako modrá bodka a mapa sa automaticky vycentruje na túto pozíciu. Táto funkcia je užitočná najmä pre turistov, ktorí chcú nájsť zaujímavé miesta vo svojom okolí.

== Dátový model

Všetky údaje o mestách a miestach sú uložené v štruktúrovanej forme v databáze. Pre zabezpečenie typovej bezpečnosti a predchádzanie chybám používame TypeScript rozhrania, ktoré presne definujú aké dáta má každý objekt obsahovať. Toto je jeden z najväčších prínosov jazyka TypeScript oproti čistému JavaScriptu — editor nás upozorní na chyby ešte pred spustením kódu.

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

Typ `Category` definuje štyri povolené kategórie pre body záujmu. Použitím union typu (zjednotenia) TypeScript zabráni priradeniu neplatnej kategórie. Ak by sme sa pokúsili vytvoriť miesto s kategóriou napríklad `hotel`, editor by okamžite zobrazil chybu.

Rozhranie `Place` definuje štruktúru jedného bodu záujmu. Každé miesto má jedinečný identifikátor, názov, kategóriu, textový popis, geografické súradnice (šírku a dĺžku), pole tagov pre vyhľadávanie, URL adresu obrázka a voliteľný odkaz na Google Maps. Otáznik pri `googleMapsLink` označuje, že tento atribút je voliteľný a nemusí byť vyplnený.

Rozhranie `City` definuje štruktúru mesta. Okrem identifikátora, názvu a súradníc stredu mesta obsahuje pole všetkých bodov záujmu, ktoré sa v danom meste nachádzajú. Táto hierarchická štruktúra zjednodušuje prácu s dátami — pri výbere mesta máme okamžite prístup ku všetkým jeho miestam.

Aplikácia aktuálne obsahuje dáta pre dve mestá, ktoré som osobne preskúmal a zdokumentoval. Pre Košice som zaznamenal 26 bodov záujmu rozdelených do kategórií: 6 kaviarní ponúkajúcich kvalitné kávové nápoje, 4 reštaurácie s rozmanitou kuchyňou, 5 prírodných miest vrátane parkov a záhrad, a 11 kultúrnych pamiatok od historických budov po moderné galérie. Pre Sečovce som zaznamenal 16 bodov záujmu: 2 kaviarne, 5 reštaurácií, 1 prírodné miesto a 8 kultúrnych pamiatok reprezentujúcich bohatú históriu tohto mesta.

Celkovo aplikácia eviduje 42 bodov záujmu s kompletnými informáciami. Každé miesto má vyplnený popis vysvetľujúci čo je na ňom zaujímavé, presné GPS súradnice pre zobrazenie na mape, kvalitný obrázok a relevantné tagy pre uľahčenie vyhľadávania. Tento obsah je základom pre užitočnosť celej aplikácie — bez kvalitných dát by aj najlepšie naprogramovaná stránka nemala zmysel.

== Administračné rozhranie

Na pridávanie a úpravu miest slúži admin panel dostupný na adrese `/admin`. Toto rozhranie som vytvoril preto, aby pridanie nového miesta nevyžadovalo úpravu zdrojového kódu a znalosť programovania. Administrátor môže jednoducho vyplniť formulár, vybrať polohu kliknutím na mapu a nové miesto sa okamžite zobrazí na verejnej stránke. Celkovo má admin panel približne 700 riadkov kódu rozdelených do niekoľkých súborov.

Admin panel má spoločný layout pre všetky stránky, ktorý zabezpečuje konzistentný vzhľad a navigáciu. Na ľavej strane obrazovky je bočný panel s navigačnými odkazmi na jednotlivé sekcie — dashboard, zoznam miest a formulár pre pridanie nového miesta. Hlavný obsah sa zobrazuje v pravej časti. Tento layout využíva responzívny dizajn, takže na menších obrazovkách sa bočný panel schová a zobrazí sa len po kliknutí na hamburger menu.

Prístup do administračného rozhrania je chránený heslom. Pri prvom pokuse o vstup do admin sekcie je používateľ presmerovaný na prihlasovaciu stránku. Prihlasovací formulár obsahuje pole pre heslo s možnosťou zobraziť alebo skryť zadávané znaky. Pri nesprávnom hesle sa zobrazí chybová správa. Pri správnom hesle sa vytvorí relácia (session) a používateľ je presmerovaný na dashboard. Relácia zostáva platná aj po zatvorení prehliadača, takže administrátor sa nemusí prihlasovať pri každej návšteve.

Dashboard je hlavná stránka administračného rozhrania a poskytuje prehľad o obsahu aplikácie. V hornej časti sa zobrazujú štatistické karty s celkovým počtom miest a rozdelením podľa kategórií. Pod nimi sú filtrovacie tlačidlá pre rýchle zobrazenie miest z konkrétneho mesta. Nasleduje interaktívny zoznam všetkých bodov záujmu, kde každá položka zobrazuje ikonu kategórie, názov, skrátený popis a geografické súradnice. Kliknutím na položku sa administrátor dostane na stránku úpravy daného miesta.

Formulár pre pridanie nového miesta je rozdelený do logických sekcií. Prvou sekciou sú základné informácie zahŕňajúce názov miesta a výber mesta, do ktorého patrí. Druhou sekciou je výber kategórie pomocou vizuálnych tlačidiel s ikonami — každá kategória má svoju charakteristickú farbu pre ľahšiu orientáciu. Treťou sekciou je popis miesta, ktorý môže byť viacriadkový a mal by obsahovať zaujímavé informácie pre návštevníkov. Štvrtou sekciou je interaktívna mapa pre výber presných súradníc.

Výber súradníc na mape je jednou z najužitočnejších funkcií admin panelu. Administrátor môže kliknúť na ľubovoľné miesto na mape a súradnice sa automaticky vyplnia. Ak nie je spokojný s presnosťou, môže značku chytiť a presunúť na správne miesto. Pod mapou sa zobrazujú aktuálne súradnice s presnosťou na šesť desatinných miest, čo zodpovedá presnosti približne 10 centimetrov. Mapa sa automaticky vycentruje na vybrané mesto, aby administrátor nemusel dlho hľadať správnu lokalitu.

Poslednou sekciou formulára sú médiá a doplnkové informácie. Patrí sem URL adresa obrázka, ktorý sa zobrazí v detaile miesta, a voliteľný odkaz na Google Maps pre externé navigovanie. Tagy sa zadávajú ako text oddelený čiarkami a slúžia pre rozšírené vyhľadávanie. Po vyplnení všetkých povinných polí sa formulár odošle na server, kde sa vytvorí nový záznam v databáze.

Stránka pre úpravu existujúceho miesta funguje podobne ako formulár pre nové miesto, ale všetky polia sú predvyplnené aktuálnymi hodnotami. Administrátor môže upraviť ľubovoľné pole a uložiť zmeny. Stránka tiež obsahuje tlačidlo pre vymazanie miesta, ktoré vyžaduje potvrdenie pre zabránenie náhodnému zmazaniu.

Serverové rozhranie (API) zabezpečuje komunikáciu medzi administračným rozhraním a databázou. Koncový bod `/api/auth` spracováva prihlásenie, odhlásenie a overenie platnosti relácie. Koncový bod `/api/cities` vracia zoznam všetkých miest. Koncový bod `/api/places` umožňuje získať zoznam všetkých bodov záujmu a vytvoriť nový záznam. Koncový bod `/api/places/[id]` umožňuje získať detail konkrétneho miesta, upraviť ho alebo vymazať. Všetky koncové body overujú či je používateľ prihlásený a vracajú chybu ak nie.

== Responzívny dizajn a tmavý režim

Stránka je navrhnutá tak, aby fungovala rovnako dobre na mobile, tablete aj na počítači. Toto je v dnešnej dobe nevyhnutnosť, keďže veľká časť používateľov pristupuje k webu z mobilných zariadení. Responzívny dizajn nie je len o zmene veľkosti prvkov, ale o premyslenom prispôsobení celého rozhrania rôznym veľkostiam obrazovky.

Na zariadeniach s šírkou obrazovky nad 768 pixelov, čo zodpovedá väčšine tabletov a počítačov, sa zobrazuje rozdelené rozloženie. Ľavý panel so šírkou 450 pixelov obsahuje ovládacie prvky aplikácie — výber mesta, prepínanie kategórií, vyhľadávacie pole a zoznam bodov záujmu. Pravá časť obrazovky je celá vyplnená interaktívnou mapou. Toto rozloženie umožňuje používateľovi súčasne prechádzať zoznam a vidieť polohu miest na mape.

Na mobilných zariadeniach sa rozloženie zásadne mení. Zobrazuje sa vždy len jedna z dvoch častí — buď zoznam alebo mapa. V spodnej časti obrazovky sú plávajúce prepínacie tlačidlá, ktoré umožňujú rýchle prepínanie medzi týmito zobrazeniami. Keď používateľ vyberie miesto zo zoznamu, aplikácia automaticky prepne na zobrazenie mapy a mapa sa vycentruje na vybrané miesto. Detail miesta sa zobrazí ako spodný panel, ktorý zaberá dolnú tretinu obrazovky a môže byť zatvorený potiahnutím nadol.

Navigačné prvky sú na mobile prispôsobené pre ovládanie dotykom. Tlačidlá sú väčšie pre jednoduchšie kliknutie prstom. Priestor medzi prvkami je dostatočný, aby sa používateľ nepreklikol na nesprávny prvok. Zoznam miest podporuje plynulé rolovanie s efektom pruženia na konci. Mapa reaguje na gestá ako priblíženie roztvorením prstov (pinch-to-zoom) a posun ťahaním.

Administračné rozhranie má tiež plne responzívnu verziu. Na počítači je stále viditeľný bočný panel s navigáciou. Na tablete a mobile sa bočný panel skryje a zobrazí sa len po kliknutí na ikonu menu. Vysúvacie menu prekryje obsah polotransparentnou vrstvou a môže byť zatvorené kliknutím mimo neho alebo na tlačidlo zatvoriť.

Aplikácia podporuje automatický tmavý režim, ktorý sa aktivuje na základe systémových nastavení zariadenia. Ak má používateľ v operačnom systéme nastavený tmavý režim, webová stránka sa automaticky prepne na tmavú farebnú schému. Toto je realizované pomocou CSS media query `prefers-color-scheme: dark`, ktorá detekuje preferenciu používateľa.

Všetky farby v aplikácii sú definované pomocou CSS premenných. V svetlom režime je pozadie biele a text čierny. V tmavom režime je pozadie tmavosivé a text svetlý. Tieto premenné sú použité naprieč celou aplikáciou, takže zmena farebnej schémy sa prejaví konzistentne na všetkých prvkoch. Framework Tailwind CSS navyše poskytuje triedy s prefixom `dark:`, ktoré sa aplikujú len v tmavom režime, čo umožňuje jemné doladenie vzhľadu jednotlivých komponentov.

Tmavý režim nie je len estetickou voľbou, ale má aj praktické výhody. Znižuje únavu očí pri používaní aplikácie v slabo osvetlenom prostredí. Na zariadeniach s OLED displejom, kde čierne pixely skutočne nesvietia, tiež znižuje spotrebu energie a predlžuje výdrž batérie.

== Nasadenie a databáza

Aplikáciu som nasadil na platformu Cloudflare Workers pomocou adaptéra OpenNext. Toto riešenie som si vybral pretože kombinuje výhody frameworku Next.js s globálnou infraštruktúrou Cloudflare. Nasadenie prebieha v dvoch krokoch, ktoré som zautomatizoval do jedného príkazu.

Prvým krokom je build, ktorý skonvertuje zdrojový kód aplikácie do optimalizovaného formátu pre produkčné prostredie. Adaptér OpenNext transformuje Next.js aplikáciu do formátu kompatibilného s Cloudflare Workers. Počas tohto procesu sa minifikuje JavaScript, optimalizujú sa obrázky a vytvárajú sa statické verzie stránok kde je to možné.

Druhým krokom je samotné nasadenie, ktoré nahrá skonvertovanú aplikáciu na servery Cloudflare. Aplikácia sa automaticky distribuuje do viac ako 230 dátových centier po celom svete. To znamená, že používateľ z Košíc sa pripojí k serveru v Bratislave alebo Viedni, zatiaľ čo používateľ z Prahy sa pripojí k serveru priamo v Prahe. Táto blízkosť výrazne znižuje čas potrebný na načítanie stránky.

Konfigurácia nasadenia je definovaná v súbore `wrangler.jsonc`. Tento súbor obsahuje názov projektu, dátum kompatibility (ktorý určuje ktorá verzia runtime sa použije), cestu k hlavnému súboru workera a konfiguráciu statických súborov. Tiež obsahuje prepojenie s databázou, o ktorej budem písať ďalej.

Na ukladanie dát používam Cloudflare D1, čo je cloudová databáza postavená na osvedčenom databázovom engine SQLite. Služba D1 bola uvedená do prevádzky v roku 2023 a rýchlo sa stala populárnou voľbou pre projekty nasadené na Cloudflare. Hlavnou výhodou je bezšvové prepojenie s Cloudflare Workers, čo znamená že databáza beží v rovnakej infraštruktúre ako samotná aplikácia.

Databáza D1 prináša niekoľko významných výhod. Beží na edge, čo znamená že dáta sú replikované blízko používateľov pre minimálnu latenciu. Nevyžaduje správu serverov — nemusím sa starať o zálohovanie, škálovanie ani bezpečnostné aktualizácie, všetko zabezpečuje Cloudflare. Má veľkorysý bezplatný tier, ktorý zahŕňa 5 miliónov čítaní, 100 tisíc zápisov a 5 GB úložiska mesačne, čo pre začínajúci projekt úplne postačuje.

Databázová schéma obsahuje dve hlavné tabuľky. Tabuľka `cities` uchováva informácie o mestách — identifikátor, názov a súradnice stredu mesta. Tabuľka `places` uchováva informácie o bodoch záujmu — identifikátor, prepojenie na mesto, názov, kategóriu, popis, súradnice, tagy vo formáte JSON, URL obrázka a voliteľný odkaz na Google Maps. Obe tabuľky majú časové značky pre vytvorenie a poslednú úpravu záznamu.

Schéma využíva niekoľko pokročilých funkcií SQLite. Obmedzenie CHECK na stĺpci kategórie zabezpečuje, že sa do databázy nedostane neplatná hodnota. Cudzí kľúč (foreign key) prepája miesta s mestami a zabezpečuje referenčnú integritu. Kaskádové mazanie znamená, že pri vymazaní mesta sa automaticky vymažú aj všetky jeho miesta. Indexy na stĺpcoch `city_id` a `category` zrýchľujú vyhľadávanie a filtrovanie.

Pre naplnenie databázy počiatočnými dátami som vytvoril seedovací skript. Tento skript načíta dáta z TypeScript súboru a vygeneruje SQL príkazy pre vloženie do databázy. Príkaz INSERT OR REPLACE zabezpečuje, že opakované spustenie skriptu nevedie k duplicitným záznamom, ale namiesto toho aktualizuje existujúce záznamy.

V kóde aplikácie pristupujem k databáze cez binding, čo je mechanizmus Cloudflare pre prepojenie workera s externými službami. Všetky databázové dotazy používajú prepared statements s bindovanými parametrami, čo je najlepšia ochrana proti SQL injection útokom. Výsledky z databázy sa transformujú pomocou konverzných funkcií do aplikačného formátu pred odoslaním na klienta.

== Testovanie

Počas vývoja som aplikáciu priebežne testoval na rôznych zariadeniach a prehliadačoch. Systématické testovanie je nevyhnutnou súčasťou vývoja softvéru, pretože odhaľuje problémy, ktoré by inak znehodnotili používateľský zážitok. Testovanie prebiehalo na viacerých úrovniach.

Funkcionálne testovanie overovalo, že všetky funkcie aplikácie pracujú správne. Testoval som prepínanie medzi mestami a kontroloval, že sa načítajú správne body záujmu. Testoval som filtrovanie podľa kategórií a overoval, že sa zobrazia len miesta zodpovedajúcej kategórie. Testoval som vyhľadávanie a kontroloval, že funguje podľa názvu, popisu aj tagov. Testoval som klikanie na značky na mape a zobrazenie detailu miesta. Testoval som navigáciu do Google Maps a overoval, že sa otvorí správna lokalita.

Responzívne testovanie overovalo správanie na rôznych veľkostiach obrazovky. Menil som veľkosť okna prehliadača a sledoval ako sa prispôsobuje rozloženie. Testoval som na reálnych mobilných zariadeniach vrátane telefónov a tabletov. Overoval som funkčnosť dotykových gest ako zoom a posun na mape. Kontroloval som čitateľnosť textu a veľkosť interaktívnych prvkov na malých obrazovkách.

Testovanie tmavého režimu overovalo vzhľad aplikácie v oboch farebných schémach. Prepínal som medzi svetlým a tmavým režimom v nastaveniach systému a kontroloval, že sa aplikácia správne prispôsobí. Overoval som kontrast textu voči pozadiu pre zabezpečenie čitateľnosti. Kontroloval som konzistenciu farieb naprieč všetkými komponentami.

Testovanie geolokácie overovalo funkciu zobrazenia polohy používateľa. Testoval som na zariadeniach s GPS prijímačom vo vonkajšom prostredí. Overoval som správanie pri odmietnutí povolenia prístupu k polohe. Kontroloval som presnosť zobrazenej polohy porovnaním s reálnou pozíciou.

Aplikácia bola otestovaná na štyroch hlavných prehliadačoch. Google Chrome na desktope aj na Android zariadeniach, kde tvorí väčšinu trhu. Mozilla Firefox na desktope, ktorý používa menšia ale lojálna skupina používateľov. Safari na iOS a macOS, čo je jediný prehliadač dostupný na iPhone. Microsoft Edge na desktope, ktorý je predvoleným prehliadačom vo Windows. Vo všetkých prehliadačoch aplikácia fungovala správne bez viditeľných problémov.

Počas testovania som identifikoval niekoľko známych obmedzení. Geolokácia vyžaduje HTTPS pripojenie a explicitné povolenie používateľa, čo je bezpečnostné opatrenie prehliadačov. Niektoré staršie prehliadače nemusia podporovať všetky moderné CSS vlastnosti ako glassmorphism efekty, ale aplikácia zostáva funkčná aj bez nich. Pri veľkom množstve značiek na mape môže dôjsť k spomaleniu na slabších zariadeniach, čo by sa dalo riešiť clusterovaním značiek v budúcej verzii.

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