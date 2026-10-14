# Fit4Life Hub — konačni sistem i modernizacija sajta

## Obuhvat

Modernizovani su Home, Programs, Program Details, Trainers, Resources, Resource Details, Contact i 404/500 stanja. Sve stranice koriste jedan header/footer, Plus Jakarta Sans/Source Sans 3 tipografiju, mat sivkasto-maslinastu tamnozelenu i nežnu lanenu (linen) bež paletu sa šampanj akcentom, kompaktnije zajedničke kartice i kontrole. Backend, poslovni podaci, nazivi, ID-jevi i URL-ovi programa/resursa, cene i paketi nisu menjani.

Odobrena Home osnova ostaje sačuvana: originalni `hero-section.jpg` preko pune širine, tekst preko fotografije, predstavljanja i šest usluga, pet konceptualnih stubova, četiri ravnopravna programa, trenerske kartice sa punim biografijama u dialogu, Resources 1+2, postojeći testimonials, kontakt/mapa i footer. Modernizacija menja detalje, tipografiju i površine, bez nove reorganizacije.

## Identitet i fontovi

Naziv je Fit4Life Hub; slogan je **Longevity – Performance Concept**. Stubovi su **Health — Better Today**, **Performance — Higher Tomorrow**, **Longevity — More Years**, **Balance — Fuller Life** i **Testing — Clearer Answers**, kao HTML tekst odvojen od SVG ikonica. Nisu pretvoreni u pojedinačne usluge niti mapirani na programe.

Header koristi `logo-mark-dark.svg` uz HTML wordmark, footer `logo-dark.svg` uz zaseban HTML slogan. Originalna geometrija, proporcije i boje SVG asseta nisu menjane. Nema glow-a, senki na logotipu ni zamene portreta. Izvorni paket je `public/fit4life-assets`; web kopije su `public/assets/fit4life`.

Naslovi i wordmark koriste varijabilni Plus Jakarta Sans. Tekst, labele, filteri i dugmad koriste Source Sans 3. `next/font` obezbeđuje lokalnu isporuku i fallback prilagođen metrikama; nema runtime Google Fonts CSS zahteva. Uključeni su latin i latin-ext podskupovi za č, ć, š, ž i đ. Učitavaju se dva varijabilna font sistema, bez odvojenih fajlova za svaku težinu. Naslovi su 700, kontrole 500–600; tracking je približno -0.022em.

## Tokeni i komponente

`src/theme/hub-tokens.css` je centralni izvor boja, površina, tipografskih skala, razmaka, širina, radijusa, bordera, senki, trajanja/easinga i z-index slojeva. `src/theme/theme-config.ts` primenjuje iste tokene u Chakra temi. Stara imena font/brand ključeva ostaju kompatibilni aliasi koji sada ukazuju na nove fontove i boje, bez učitavanja Montserrat/Roboto.

| Namena                                        | Token / vrednost                                       |
| --------------------------------------------- | ------------------------------------------------------ |
| Svetla osnova / alternativni pesak            | `--hub-sand`, #F6F3EE / `--hub-sand-deep`, #EDE9E2     |
| Tamna sekcija / footer                        | `--hub-forest`, #1C2B25 / `--hub-forest-deep`, #121C18 |
| Svetla kartica / hover                        | #FDFCFA / #F9F7F3                                      |
| Tamna kartica / podignuta površina            | #24352E / #2C3E36                                      |
| Svetli kontekst: tekst / sekundarni tekst     | #121C18 / #5C645E                                      |
| Tamni kontekst: tekst / sekundarni tekst      | #FDFCFA / #B3BCB6                                      |
| Selektivni akcenat / tamni focus / active     | #EBE4D8 / #F2EDE5 / #DFD6C7                            |
| Svetli border kartice / kontrole              | #E8E3DB / #848C86                                      |
| Tamni border kartice / kontrole               | #3A4A43 / #86948C                                      |
| Svetla error / tamna error                    | #A3392F / #F3B2A6                                      |
| Kartice / inputi / CTA / header               | 20px / 12px / 999px / 28px radijus                     |
| Širina sadržaja / članka                      | 1400px / 760px                                         |
| Sekcija / razmak posle uvoda / završni link   | clamp(60px, 6vw, 88px) / clamp(28px, 3vw, 40px) / 32px |
| Padding programa i trenera / razmak u kartici | 16px / 8px                                             |
| Kontrola                                      | najmanje 52px visine; filteri 46px; polja 56px         |
| Tranzicije                                    | 200ms; header 300ms; reveal 520ms; stagger 70ms        |

Semantički tokeni `--hub-background`, `--hub-surface`, `--hub-surface-hover`, `--hub-text`, `--hub-text-muted`, `--hub-border`, `--hub-control-border`, `--hub-action-*`, `--hub-link*`, `--hub-focus`, `--hub-field-*`, `--hub-filter-*`, `--hub-disabled-*`, `--hub-error` i `--hub-success` određuju ulogu boje. Podrazumevani kontekst je svetao; `data-tone="dark"` postavlja tamni kontekst i njegove foreground/hover/active/focus/disabled boje. Kompatibilni aliasi se ponovo vezuju u tom kontekstu, kako Chakra i CSS Modules ne bi nasledili već razrešenu svetlu površinu.

Paleta je u oktobru 2026. pomerena sa plavkaste petrol (#123B36) i ružičastog „oatmeal“ peska (#F4EFE8) na mat, manje zasićenu sivkasto-maslinastu zelenu (#1C2B25). Bež je potom omekšan: umesto sivkaste kamene podloge (#EFEDE7) koristi se svetao, nežan lan (#F6F3EE) niske zasićenosti, kartica je skoro bela topla površina (#FDFCFA), a greige akcenat je zamenjen svetlim šampanj tonom (#EBE4D8). Nijanse drže hue oko 37–38° uz malu zasićenost: dovoljno toplo da ne deluju sivo, dovoljno čisto da izgledaju moderno, i dalje od ružičastog „oatmeal“ tona. Sekundarni tekst je #5C645E; na najtamnijem pesku (#EDE9E2) ima 5.05:1, a na akcentu 4.83:1. Svetla primarna dugmad su tamnozelena sa toplim belim tekstom; šampanj akcenat (#EBE4D8) je za hero/header CTA, tamni kontakt panel, istaknuti paket i male akcente. Aktivni desktop nav link je frosted kapsula (`rgba(255,253,249,.16)`), ne puna bela. Aktivni filter je tamnozelen, kao hover. Hover na akcijama traje 380ms. Focus je tamnozelen na svetlom i svetlozelen na tamnom. Native select koristi odgovarajući light/dark color-scheme; readonly, invalid i disabled polja imaju zasebne uloge.

### Raspored površina i kompaktnost

Home: originalni fotografski hero sa tamnozelenim overlayem → predstavljanje/usluge na svetlom pesku → tamni stubovi → programi na pesku sa toplim belim karticama → tamni tim sa svetlijim tamnim karticama → Resources na pesku sa tamnim overlayem fotografskih kartica → testimonials na tamnijem pesku sa belim karticama → kontakt na pesku sa tamnim panelom → duboki tamni footer.

Na mobilnom hero prati visinu sadržaja. „Fit4Life Hub“ bedž se ne ponavlja, slogan ostaje, a pet stubova je 2+2+1 panel (radijus 20px, tanak border, zajednička tamna površina, SVG ikonica, naziv i poruka). Desktop hero prikazuje pet kolona. Listing stranice, članci, forme i 404/500 koriste svetlu osnovu. Fotografski detail hero-i i istaknuti Pro paket ostaju ciljano tamni.

Širina glavnog sadržaja nije smanjena. Home i Programs/Trainers listing i dalje prikazuju četiri ravnopravne kartice od 1200px; listing rezultati imaju dve kolone od 640px i jednu ispod 640px. Resources listing grid je centriran, sa najviše 380px po kartici: tri fleksibilne kolone do ukupno 1188px, dve do 784px i jedna do 380px. Fleksibilni minmax(0,1fr) trackovi omogućavaju skupljanje bez overflowa. Detail hero-i, paketi, forme, testimonials i stubovi nisu proporcionalno smanjivani.

Programi sada imaju široku fotografiju 16:9 (oko 169px pri širini 300px), uz pojedinačni object-position za postojeće četiri fotografije. Tekstualni deo ima 16px padding, naziv 20–22px koji se prirodno prelama bez skraćivanja, diskretne kategorije, uvodni opis do dva reda i cenu/CTA u zajedničkom donjem redu. Nema fiksne ukupne visine kartice. Kompletan opis ostaje na detail ruti.

Trenerski portretni blok je clamp(180px,14vw,200px), odnosno 190px na mobilnom. Slika je centrirana i ograničena na 280px širine, sa gornjim kadrom i 8px prostora iznad glave, kako široke tablet kartice ne bi previše uvećale portret. Tekst ima 16px padding i 8px razmake, ime, specijalnost i uvod do dva reda. Dugme **Više o treneru / More about the trainer** otvara jedan zajednički Chakra Modal. Dialog prikazuje originalnu punu biografiju, portret i sve postojeće kategorije; nema novih podataka niti novih ruta. Naslov je ime trenera, fokus ide na zatvaranje, Tab ostaje unutar dialoga, Escape i dugmad zatvaraju, a fokus se vraća na stvarni trigger. Pozadina je inert, body scroll se zaključava uz očuvanje scrollbar prostora; reduced-motion uklanja modalno pomeranje. Sadržaj ostaje u dialogu kroz izlaznu tranziciju. Navigacija ili promena jezika zatvaraju ga. Kartica je article sa dugmetom, bez spoljašnjeg linka.

Listing Resources imaju fotografiju 16:9, 16px padding, čitljiv naslov 22px i opis do dva reda; kompletni članci i detail hero-i ostaju nepromenjeni. Home zadržava veliku desktop fotografsku kompoziciju 1+2. Ispod 768px sva tri Home članka imaju isti landscape format sa 16:9 fotografijom i opisom do dva reda.

Ove vrednosti su **CSS pravila**, ne izmerene dimenzije kartica u browseru. Ukupna visina zavisi od širine, jezika i dužine naslova; nema tvrdog ograničavanja ili odsecanja naziva. Paketi zadržavaju sve stavke/cene i Pro oznaku, forme sve labele i touch targete.

Glavni reusable elementi su `HubPage`, `HubPageMeta`, `HubPageHeading`, `HubFilters`, `HubSectionHeading`, `HubLink`, kartice u `home-cards.tsx`, `HubDetailHero`, `HubForm`/`HubField`, `PricingPlanCard`, `HubContactPanel`, `HubCarousel` i `TrainerDialogProvider`. CSS Modules ograničavaju stilove po nameni. Glass je prvenstveno header, sada providniji (`rgba(18,28,24,.72)` i blur 22px). Aktivni desktop nav link je frosted kapsula (`rgba(255,253,249,.16)`), ne puna bela i ne donja crta. Ostale površine su čvrste i imaju čitljiv border.

## Poliranje akcija, okvira i dubine

`HubButton`, `HubLink` i `HubArrow` dele `hub-action.module.css`. Native button tip, klik callback i href ostaju isti; krug strelice je dekorativni span unutar iste akcije, bez novog interaktivnog elementa ili tab stopa. Standalone CTA imaju 999px pill radijus i 52px minimalnu visinu, back link 48px; kartične akcije ostaju kompaktne na 44px. Tekstualni linkovi zadržavaju lakši oblik. Forme/paketi/modal koriste isti sistem; filteri i carousel kontrole koriste iste semantičke boje. Inputi zadržavaju 12px radijus, 56px visinu i snažniji kontrolni border. Nazivi, opisi, cene, fontovi i responsive gridovi nisu menjani.

| Akcija               | Default                          | Hover na fine pointer uređaju                |
| -------------------- | -------------------------------- | -------------------------------------------- |
| Tamnozelena na svetlom | #1C2B25 / #FDFCFA              | #F6F3EE / #1C2B25, mekan border i mala senka |
| Svetla sekundarna    | #FDFCFA / #1C2B25                | #1C2B25 / #FDFCFA                            |
| Šampanj akcenat      | #EBE4D8 / #121C18                | #F2EDE5 / #1C2B25                            |
| Sekundarna na tamnom | toplo bela sa 5% alpha / #FDFCFA | #F6F3EE / #1C2B25                            |

`--hub-button-border` koristi rgba(28,43,37,.16) na svetlom i rgba(255,253,249,.18) na tamnom; hover koristi .28 / .32. To su dekorativni borderi. `--hub-control-border`, invalid i focus tokeni ostaju jači za inpute i keyboard fokus. Disabled stanje koristi svoju površinu/tekst, bez smanjivanja opacity cele akcije. Active je blagi pritisak od 1px; boje ostaju kontrastne. Default/hover ne menjaju padding, border debljinu ni veličinu kruga. Hover je ograničen na `(hover:hover) and (pointer:fine)`; pomeranje dugmeta 1px, horizontalne strelice 3px i kartice 2px dodatno zahteva `prefers-reduced-motion:no-preference`. Strelica u krugu pokazuje desno. Reduced-motion uklanja pomeraje i tranzicije. Slogan, glavni hero raspored i header logika ostaju isti.

Programi i listing članci imaju 7px uvučenu fotografiju, unutrašnji radijus 15px i spoljašnji 20px. Odnos 16:9 i postojeći object-position ostaju isti. Za širinu 300px, 7px gornje margine uz 14px užu fotografiju praktično zadržava ukupnu visinu foto-bloka (promena oko -0.9px). Ovo je CSS proračun, ne browser merenje. Trenerski blok ima isti ukupni prostor kao ranije: 7px margina je oduzeta od visine unutrašnje površine. Portreti i biografija dialog ostaju isti. Kategorije su meke tonirane oznake sa 14px tekstom i bez teških bordera. Puni link kartice nemaju dugme unutar linka; trener je article sa pravim dugmetom.

Home Resources zadržava 1+2 i mobilni carousel, uz donji čitljiv gradient i svetlije gornje delove fotografije. Sitne kategorije preko slike imaju toniranu tamnu podlogu radi kontrasta. Testimonials i stubovi dobijaju samo malu dubinu, bez promene paddinga ili dimenzija. Focus-within naglašava border i senku kartice; fotografska kartica ima spoljašnji outline koji ne zavisi od clippinga slike.

Senke su centralizovane: `--hub-shadow-sm`, `--hub-shadow-card`, `--hub-shadow-card-hover`, uz `--hub-shadow-track` / `--hub-shadow-track-hover` za native slajdere. Površine su mat: svetle kartice imaju jedva primetnu senku od 1–2px (hover 8px), a tamne nemaju ni senku ni svetlu unutrašnju ivicu, već se odvajaju tonom i tankim borderom (`rgba(253,252,250,.12)`, hover .22). Pet stubova su ravni paneli `--hub-surface` / hover `--hub-surface-hover`, bez staklenog gradijenta i backdrop blur-a; na hover (fine pointer, bez reduced-motion) preko panela prelazi kosi svetli odsjaj (760ms), jedini sjaj u inače mat sistemu. Preko cele stranice je fiksni grain sloj (SVG fractal noise u toplom taupe tonu umesto crnog, `mix-blend-mode: multiply`, `--hub-grain-opacity` 0.07, bez pointer događaja, sakriven u štampi) koji daje utisak mat papira; na tamnozelenoj se ponaša isto kao ranije, a lan na svetlim sekcijama ne posivljuje. Header zadržava svoj postojeći token. Nema glow efekata ili skaliranja cele kartice.

Na telefonu carousel viewport ima 20px gornjeg i 36px donjeg paddinga, uz kompenzacione vertikalne margine, da track senka (blur do 12px) ostane unutar scroll kontejnera. Horizontalni overflow stranice se ne širi negativnom marginom. Kartica je približno 82% širine. Track senke se vezuju na kartice, uključujući tamni kontekst.

## Floating dynamic-island header

Header je fixed i centriran, odvojen od vrha i ograničen na 1200px ili širinu ekrana umanjenu za 48px. Tamnozelena glass površina (rgba(18,28,24,0.94)) koristi statički backdrop blur, border i diskretnu senku; bez backdrop-filter podrške ostaje čvrsta tamnozelena pozadina.

Na desktopu (od 1100px) skuplja se na 840px i 68px visine kada scroll dostigne 64px. Ostaje skupljen kroz međuzonu i vraća se na vrhu, na 32px ili manje. Hover ili focus-within ga proširuju; njihov izlazak vraća kompaktno stanje ako je stranica i dalje skrolovana. Sekundarni Home/Contact nav linkovi i jezički izbor u kompaktnoj varijanti imaju nultu širinu i `visibility: hidden`, pa nisu dostupni za fokus. Brend, Programs, Trainers, Resources i CTA ostaju dostupni.

Scroll listener je passive, grupisan kroz requestAnimationFrame; React state se menja samo kada se promeni režim. Header se nikad ne skriva. Tranzicija širine/unutrašnjih razmaka traje 300ms; blur se ne animira.

Mobilna kapsula (ispod 1100px) poštuje safe-area insete i centar raspoložive širine. Na vrhu je proširena floating kapsula, visoka 64px, sa simbolom, nazivom Fit4Life Hub i burger dugmetom od 44px. Nakon 64px skrola, dok je meni zatvoren, skuplja se na 228×56px: ostaju simbol i naziv, burger je `hidden` i nije u tab redosledu. Povratak na 32px ili manje vraća prošireno stanje. Histereza je ista kao na desktopu. Tranzicija širine traje 300ms; reduced-motion je gasi.

Brend u kompaktnom stanju je zasebno dugme „Proširi navigaciju“ / „Expand navigation“, ne Home link i ne ugnježdena kontrola. Prvi dodir samo proširuje kapsulu i otkriva burger. Tastatura radi isto i zatim fokusira burger. Ručno proširenje nema tajmer. Sledeći pomak od najmanje 48px može da ga skupi samo dok je meni zatvoren i dok tastaturni fokus nije u headeru. U proširenom stanju brend je običan Home link.

Meni je fullscreen Chakra Modal (`size="full"`, `trapFocus`, `useInert`, `closeOnEsc`, povratak fokusa na burger). Pozadina je `--hub-forest-deep`. Visina je `100vh` sa `100dvh` fallbackom, uz safe-area padding. Brend i dugme za zatvaranje su u vrhu; isto dugme ima dve linije koje za 260ms rotacijom postaju X, bez zamene ikonice, bez promene dimenzija i bez okvira ili ispunjene pozadine. Linkovi su krupni, sa aktivnom stranicom, SR/EN izborom i kontakt CTA. Kraći ekrani skroluju sadržaj menija. `react-remove-scroll` zaključava pozadinu i čuva njen položaj. Ruta, jezik ili prelazak na desktop zatvaraju meni i puštaju lock. Header ostaje proširen tokom otvaranja, korišćenja i zatvaranja. Otvaranje je fade i pomeraj od 12px; linkovi kasne po 45ms. Overlay se uklanja tek posle izlazne tranzicije. Reduced-motion ukida rotaciju, stagger i pomeraj.

Unutrašnje stranice imaju rezervisan prostor od 132px; fotografski hero-i imaju odgovarajući padding. Home fotografija ide ispod headera. Sidra i forme koriste scroll-margin za fixed header.

## Mobilni Home carouseli

`HubCarousel` ispod 768px koristi Embla (`embla-carousel-react` 8.6.0). Native scroll-snap ostaje fallback pre hidratacije i bez JavaScripta, ali ne može pouzdano da kruži bez premeštanja DOM-a tokom dodira, zato je petlja na Embla transformima. Desktop gridovi, uključujući Resources 1+2, i listing stranice ostaju netaknuti. Kontakt i tekstovi ostaju vertikalni.

Programs, Trainers, Resources i Testimonials imaju karticu `min(82%, 380px)`, razmak 14px i centriran aktivni slajd. Deo prethodnog i sledećeg slajda vidi se sa obe strane, uključujući početak. Nema vidljivih strelica, brojeva, tačkica ni autoplay-a. Susedne kartice idu do `scale(0.96)` tokom pomeranja; skaliranje je na unutrašnjem omotaču da ne pregazi Embla petlju. Reduced-motion uklanja scale i dekorativni prelaz, a ručno listanje ostaje. Posle puštanja najbliža kartica ide u centar. Petlja radi u oba smera.

Dve stavke dobijaju po jednu inertnu vizuelnu kopiju, jer jedna fizička susedna kartica ne može da popuni obe ivice. Kopija se pravi jednom, van aktivnog dodira; `sanitizeCarouselCopy` skida id, href i tab stop. Tri i više stavki koriste Embla loop bez kopija. Jedna stavka je obična kartica, bez petlje i poruke „Prevuci za više“ / „Swipe to explore“.

Ta poruka stoji ispod grupe. Prethodno/sledeće kontrole su u DOM-u radi tastature i screen readera, a vide se samo kad carousel ili same kontrole imaju keyboard focus. Track prima fokus; Left/Right/Home/End pomeraju carousel, ne linkove unutar kartice. Fokus na kartici je dovodi u centar. Svaki pravi slajd ima lokalizovan redni broj, a učtiv status javlja aktivni slajd. Swipe duži od 10px ne otvara link niti dijalog trenera. `touch-action: pan-y` ostavlja vertikalni scroll stranice. Reveal je na celoj grupi.

## Stranice i ponašanja

- **Programs / Trainers / Resources:** zajednički filteri, kategorije i status broja rezultata. `category` ostaje query parametar. Filtriranje je shallow, čuva ostale query vrednosti i scroll položaj. „All“ uklanja samo category; nepoznate vrednosti prikazuju sve. Ostaju početnih šest stavki i povećanje za tri pri „Prikaži još“. Rezultati se ne skrivaju/reanimiraju pri promeni filtera.
- **Program Details:** pun fotografski hero, kategorije, opis i postojeće činjenice o programu; tri paketa sa svim postojećim stavkama, cenama i Pro oznakom iz originala. Izbor čuva `pricing_plan`, dodaje `#form`, skroluje na formu i fokusira select. Svi postojeći ID-jevi ostaju isti.
- **Resource Details:** kompletni članci, širina teksta 760px, line-height 1.9 i povezani resursi. Duži tekst nije animiran pasus po pasus.
- **Contact:** gornji blok su dve jednake kolone (informacije levo, forma desno); mapa je ispod, u istoj širini kontejnera. Oba panela su frosted glass na pesku (`rgba(255,253,249,.42)`, blur 20px). Forma koristi placeholder u polju; label ostaje `sr-only` i vezan za input. Home kontakt sekcija ostaje tamni panel pored mape. Adresa, email, telefon, Formspree action, POST, imena polja i required pravila su isti. Nema društvenih linkova jer u projektu nema potvrđenih URL-ova.
- **404/500:** isti identitet i funkcionalan povratak na Home.

Detalji programa i članaka sada koriste getStaticPaths/getStaticProps za sve postojeće ID-jeve i oba jezika. Sadržaj i SEO su dostupni u HTML-u pre JavaScripta, bez ranijeg privremenog „nije pronađeno“ prikaza. Nepostojeći ID vraća 404. Canonical domen i relevantni OG/Twitter metapodaci su sačuvani, a naziv brenda ažuriran. Quotes u postojećim testimonials nisu prepisani.

## Forme i pristupačnost

Formspree action, POST metod i imena polja su sačuvani. Kontakt: firstName, lastName, email, phone, message. Prijava: firstName, lastName, email, phone, program, pricingPlan. Program ostaje neizmenjiva prevedena vrednost; select paketa koristi basic/pro/premium. Nema simulirane success poruke ili promene eksternog toka; slanje i odgovor ostaju na postojećem servisu. Test poruke se ne šalju.

Prave label/input veze, native required/email validacija, tel tip, autocomplete, vidljiv focus i dovoljno veliki touch targeti važe kroz sve forme. Na Contact stranici je label vizuelno u placeholderu, a u DOM-u ostaje `sr-only`. Program prijava zadržava vidljive labele. Native user-invalid i aria-invalid stanja imaju semantičku error boju; disabled kontrole i dugmad imaju jasan stil. Cela kartica koja je link nema ugnježdene linkove/dugmad. Focus fotografske kartice iscrtava se na spoljašnjem elementu da ga clipping ne sakrije.

## Animacije i fallback

`usePageReveal` koristi jedan IntersectionObserver po stranici i Web Animations API. Sadržaj je **vidljiv po defaultu**. Animacija se dodaje tek kada observer javi ulazak u prošireni viewport; ako JS, observer ili animate API nisu dostupni, sadržaj se ne skriva. Reveal je jednokratan, 20px na desktopu / 12px na mobilnom, 520ms, sa staggerom od 70ms ograničenim na ukupno 280ms / 140ms.

Već vidljiv sadržaj pri kasnijoj hidrataciji ne vraća se na nultu opacity vrednost, pa hero ne nestaje. Focusin odmah prekida animaciju elementa koji sadrži fokus. Prefers-reduced-motion preskače reveal i ukida tranzicije, pomeraje i skaliranje, uključujući programski scroll. Promena preferencije tokom animacije odmah je prekida. Cleanup pri navigaciji uklanja observer, animacije i listenere. Route ključ uključuje ID članka/programa, ali izostavlja query/hash, pa filtriranje ne pokreće reveal ponovo.

Kartice koriste blago podizanje do 2px na hover-capable fine pointer uređajima i zoom fotografije 1.025, unutar slike. CTA strelice imaju mali pomeraj. Nema scroll hijackinga, parallaxa, 3D tilt-a, magnetnih dugmadi ni beskonačnih dekorativnih animacija.

Poliranje dugmadi, bordera, kartica i senki ostaje sačuvano. Mobilna faza posle toga menja hero ritam, header, fullscreen meni i Home carousele; paleta, fontovi, cene, rute, filteri, forme i integracije ostaju.

Proračun akcija (mat paleta iz oktobra 2026): tamnozeleni default/svetli secondary hover 13.78:1; tamnozeleni tekst na pesku ili accent hover najmanje 12.08:1; akcenat 12.89:1; accent active 11.14:1; primary active 17.14:1; disabled tekst 4.72:1 na svetlom / 5.83:1 na tamnom. Kružne strelice i tamni secondary nisu ponovo računati; njihove tamne površine su tamnije nego u prvobitnoj petrol paleti, pa kontrast prema svetlom tekstu nije opao. Disabled strelice nemaju dodatni tint koji bi oslabio kontrast. Sitna oznaka preko najsvetlije hipotetičke fotografije ima 4.89:1. To su proračuni boja, ne browser merenja celog fotografskog kadra.

## Provera i pregled

Pokretanje: `npm run dev`; http://localhost:3000/sr i http://localhost:3000/en. Produkcijski pregled: `npm run build` pa `npm run start`.

Komande: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`. Node testovi proveravaju pragove/histerezu headera, zadržavanje ručnog proširenja, kategorije, filtere, `pricing_plan` i kružni indeks, rastojanje i scale susednog slajda.

Mobilna faza: lint bez upozorenja, TypeScript, 9 Node testova i produkcijski build (35 statičkih stranica) prolaze. Nove labele su u `en.ts` i `sr.ts`. Na `/en` se vide „Open menu“, „Swipe to explore“, „Previous slide“ / „Next slide“ i „Mobile navigation“. Na `/sr` isto važi za „Otvori meni“, „Prevuci za više“ i „Mobilna navigacija“.

U browseru, na 390×844:

- Hero badge „Fit4Life Hub“ je sakriven, slogan ostaje. Panel pet stubova je 2+2+1, radius 20px, pozadina `rgba(18, 28, 24, 0.66)`, ikone 24px, tekstovi Health / Performance / Longevity / Balance / Testing sa porukama Better Today, Higher Tomorrow, More Years, Fuller Life, Clearer Answers. Hero je niži od viewporta. Horizontalni overflow stranice je 0.
- Skupljena kapsula je 228px i centrirana; burger je `hidden`. Dodir brenda ostaje na istoj ruti, proširuje kapsulu i otkriva burger. Pomak od 30px drži proširenje; pomak od 160px skuplja; vrh stranice ponovo proširuje.
- Fullscreen meni puni visinu viewporta, `main` je `inert` dok je otvoren, X je rotacija od 45°, fokus kreće na zatvaranje. Escape i klik na zatvaranje uklanjaju dijalog i vraćaju fokus na burger.
- Četiri Home grupe: kartica 82% viewporta, razmak 14px, susedi `scale(0.96)`, prethodni slajd viri levo već na startu. Tastatura (ArrowLeft/ArrowRight) prolazi sve stavke i preko granice petlje u oba smera. Link programa vodi na detalj. Dijalog trenera se otvara i zatvara. U `prefers-reduced-motion` scale je `none`, burger tranzicija je 0s, a strelice i dalje pomeraju slajd.

Isto na 360px i 430px: 2+2+1 panel, kapsula, kartica 82%, overflow 0. Na 1440px burger je `display: none`, navigacija je flex, hero badge je vidljiv, stubovi su pet kolona bez mobilnog panela, carousel track je grid i nema `data-enhanced`.

Nije potvrđeno pouzdanim dodirom: Embla ignoriše sintetičke pointer događaje, pa stvarni swipe prstom i vertikalni gest koji kreće na kartici nisu odrađeni. Petlja i snap posle puštanja oslanjaju se na Embla, a granica petlje je proverena tastaturom i početnim položajem kloniranog poslednjeg slajda. Grupe sa jednom ili dve stavke nisu u trenutnim Home podacima. Izlazna animacija menija nije merena kadar po kadar; dijalog ostaje dok zatvaranje ne završi. Slanje Formspree poruka nije rađeno. Nema push-a ni deploy-a.
