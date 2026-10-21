# MUSE – makeup og hudpleje

MUSE er et website om makeup og hudpleje. Produkterne vises på shop-, produkt- og søgesiderne. DummyJSON leverer produktdata, og den lokale produktfil indeholder MUSE-indhold som danske navne, priser, billeder og beskrivelser.

## Sådan åbnes sitet

Åbn GitHub-repoet, og klik på sitets link under **About** for at åbne websitet.

## Sider

- **Forsiden (`index.html`)**: introducerer MUSE og viser sidens indhold.
- **Shop (`shop.html`)**: henter produkter fra DummyJSON, viser produkter der findes i `data/produkter.json`, og bruger de lokale MUSE-oplysninger på produktkortene. Kategorierne, prisvalget og sorteringen opdaterer produktlisten.
- **Produkt (`produkt.html`)**: læser produktets `id` fra adressen, henter produktet fra DummyJSON og bruger samme id til at finde MUSE-navn, pris, billede og tekster lokalt. Et ugyldigt eller ukendt id får endnu ikke vist sidens besked om, at produktet ikke findes.
- **Kontakt (`kontakt.html`)**: browseren kontrollerer formularfelterne. Når formularen er gyldig, viser JavaScript en tak-besked. Beskeden sendes eller gemmes ikke på en server.
- **Søg (`sog.html`)**: `js/sog.js` henter produkter fra DummyJSON og matcher dem med `data/produkter.json` via produkt-id. Søgning bruger MUSE-navne og søgeord, og resultaterne viser MUSE-billeder, billedtekster og lokale priser i DKK. Kategorier, forslag, ryd-knap, antal og besked ved tomt resultat er koblet til sidens eksisterende felter.
- **404 (`404.html`)**: vises, når en side ikke findes.

## DummyJSON og MUSE-indhold

DummyJSON er sitets eneste eksterne produkt-API. Shoppen henter produktlisten eller en kategori, og produktsiden henter ét produkt ud fra dets id.

`data/produkter.json` supplerer de matchende produkter med MUSE-indhold. Produkt-id'et er forbindelsen mellem kilderne. Den lokale fil indeholder blandt andet danske produktnavne, priser i DKK, billeder fra `img/products/`, billedtekster, badges og beskrivelser. DummyJSON bruges altså til produktlisten, kategorien og id'et; det lokale indhold giver produkterne deres MUSE-udtryk.

Den lokale fil har MUSE-oplysninger for id `1`–`5` og `118`–`120`. Shop-, produkt- og søgesiden bruger produkt-id'erne til at koble DummyJSON-produkterne med MUSE-indholdet.

## Filer og mapper

```text
index.html, shop.html, produkt.html, kontakt.html, sog.html, 404.html
css/       fælles stil og sidernes udseende
js/        shop.js, produkt.js, kontakt.js, sog.js
data/      produkter.json med MUSE-oplysninger knyttet til produkt-id'er
fonts/     skrifttyper
img/       logo, produktbilleder og øvrige billeder
```

## Tjek før aflevering

- Prøv shop-siden med alle produkter og med hver kategori. Kontrollér også prisvalg og sortering.
- Åbn et produkt fra shoppen, og kontrollér at id'et i adressen viser det rigtige MUSE-produkt.
- Prøv også et ugyldigt produkt-id, og kontrollér at beskeden om manglende produkt vises; det mangler endnu i den nuværende JavaScript.
- Prøv søgning på MUSE-navne og søgeord, kategoriknapper, forslag, ryd-knappen og søgninger uden resultater.
- Prøv kontaktformularen både med manglende/ugyldige felter og med gyldige oplysninger. Tak-beskeden er kun lokal; formularen sender ikke en besked.
- Sammenlign siderne med prototypen på både mobil og computer.

## Dokumentation

Den tekniske dokumentation og rapportens beskrivelser skal passe til den kode og de funktioner, der faktisk indgår i den endelige version.
