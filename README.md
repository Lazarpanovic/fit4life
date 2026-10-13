# Fit4Life Hub

Next.js Pages Router + React + Chakra UI, sa SR/EN lokalizacijom i Fit4Life Hub dizajnerskim sistemom: petrol tamnozelena, ivory pesak, bele kartice i mist akcenti. Home zadržava odobrenu sportsku strukturu, originalnu fotografiju grupnog treninga i postojeće programe, tim, resurse, testimonials i kontakt mapu. Semantički svetli/tamni tokeni, landscape kartice, zajednički dialog biografija, mobilni Home carouseli i floating glass header koji se skuplja i na telefonu primenjeni su na sve korisničke stranice.

## Pokretanje

```bash
npm run dev
```

Srpski prikaz: http://localhost:3000/sr. Engleski prikaz: http://localhost:3000/en.

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run start
```

`next/font` preuzima Plus Jakarta Sans i Source Sans 3 tokom builda i isporučuje ih lokalno. Prvo preuzimanje zahteva mrežni pristup; prikaz sajta ne zavisi od spoljnog font CSS servisa.

CTA akcije dele pill stil i semantičke bež/petrol hover boje. Kompaktne kartice koriste uvučene fotografije i centralizovane nivoe senke, bez promene poslovnih podataka ili rasporeda.

## Dokumentacija

[Konačni dizajnerski sistem, stranice, header i provere](docs/fit4life-hub-design-system.md).

Pripremljeni SVG asseti: `public/fit4life-assets/README.md`; web putanje: `public/assets/fit4life`.

Poslovni podaci su u `src/data/data.ts`, a prevodi u `src/i18n/en.ts` i `src/i18n/sr.ts`. Program i kontakt forme koriste postojeće Formspree okruženje, POST metod i izvorna imena polja. Mapa koristi originalne Leaflet komponente, koordinate i OpenStreetMap tiles. Testovi ne šalju poruke spoljnim servisima.
