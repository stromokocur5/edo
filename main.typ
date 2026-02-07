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

// --- 7. POUŽITÁ LITERATÚRA ---
#pagebreak()
#heading(level: 1, numbering: none)[Zoznam použitej literatúry]

1. Next.js Documentation. [online]. Dostupné na: https://nextjs.org/docs
2. React - A JavaScript library for building user interfaces. [online]. Dostupné na: https://react.dev
3. Leaflet - an open-source JavaScript library for interactive maps. [online]. Dostupné na: https://leafletjs.com
4. Tailwind CSS Documentation. [online]. Dostupné na: https://tailwindcss.com/docs