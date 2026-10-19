# MUSE – version uden JavaScript (skelet til teamet)

Samme design som det færdige MUSE-site, men **uden logik**. HTML og CSS er færdige. I skriver selv JavaScript til **shop**, **produkt** og **kontakt** – det er det, opgaven kræver. Resten er ekstra.

Kør sitet med **Live Server** i VS Code (eller `python3 -m http.server`). `fetch` virker ikke, hvis man bare dobbeltklikker på HTML-filen.

## Det virker allerede (uden JS)

- **Forsiden** og **404-siden**: banner, stickers (hover og tryk) og video-listen, man kan swipe.
- **Mobilmenuen**: burgeren linker til `#menu`, og CSS viser menuen. Krydset lukker den.
- **Kategori-chips i shoppen**: de er links (`shop.html?kategori=makeup`), så de skifter allerede adressen.
- **Kontaktformularen**: HTML-valideringen står i formularen, og browseren viser selv fejlene. Den bruger `method="get"`, så den aldrig giver en fejlside på GitHub Pages.
- **Accordions** på produktsiden: `details`/`summary` åbner og lukker uden JS.

## Jeres opgaver – i denne rækkefølge

Hver js-fil har en kort tjekliste øverst med de id'er, I skal bruge.

| # | Fil | Skal laves (krav) | Ekstra, hvis der er tid |
|---|---|---|---|
| 1 | `js/shop.js` | Hent produkter med fetch, tegn kortene i `#produkter`, vis kun den valgte kategori (`?kategori=`), skriv antal i `#antal` | Marker valgt chip, skift overskrift, prisfilter, sortering, fejlbesked |
| 2 | `js/produkt.js` | Læs `?id=`, udfyld siden, vis »Produktet findes ikke« ved forkert id | »Læg i kurv«-besked, »Du vil også elske« |
| 3 | `js/kontakt.js` | `preventDefault()` og vis tak-beskeden, når formularen er gyldig | Egne danske fejlbeskeder og fejloversigt |
| – | `js/sog.js` | – | Hele søgesiden er ekstra |

Tre små funktioner er nok til det meste: **hente** (fetch), **tegne** (lave HTML og sætte den ind med `innerHTML`) og **filtrere** (`filter`).

## Data

- **DummyJSON:** `https://dummyjson.com/products/category/beauty` (makeup), `https://dummyjson.com/products/category/skin-care` (hudpleje) og `https://dummyjson.com/products/4` (ét produkt).
- **`data/produkter.json`:** vores egne navne, priser, billeder, badges, tekster og citater. Nøglen er produktets id i DummyJSON. Kun disse 8 id'er har billeder: 1, 2, 3, 4, 5, 118, 119, 120.

## Forenklet i denne version

For at gøre opgaven overskuelig er disse ting taget ud af HTML'en: favorit-hjerterne, »Gem«-knappen, pilene på citatet og eksempel-kortene. »Du vil også elske« er skjult (`hidden`), indtil I tegner kortene. Det må gerne mangle i afleveringen.

## Mapper

```
css/    base, komponenter, shapes, layout (alle sider) + én fil pr. side
js/     shop.js, produkt.js, kontakt.js, sog.js – tomme, kun tjekliste
data/   produkter.json
fonts/  Fredoka og Quicksand
img/    produkter, kategorier, hero, videoer, stickers, ikoner og logo
```

## Husk

- Skriv korte kommentarer i jeres kode (hvad gør funktionen?) – de skal med i den tekniske dokumentation.
- Rapportens tekniske slides (opbygning, navngivning, database) skal beskrive **jeres** kode, når den er færdig.
