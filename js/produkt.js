/* =========================================================
   produkt.js – TEAM: koden til produkt.html (single view)
   ---------------------------------------------------------
   SKAL LAVES (kravene i opgaven) – i denne rækkefølge:

   1. Læs id'et fra adressen:
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");   // fx "4"

   2. Hent produktet fra DummyJSON:  "https://dummyjson.com/products/" + id
      og vores tekster fra  data/produkter.json  (brug  produkter[id]).

   3. Findes id'et ikke i produkter.json? Så:
        - sæt  hidden = true  på #produkt, #accordions og #citat
        - sæt  hidden = false på #ikke-fundet
      og stop her.

   4. Udfyld siden med textContent (og src/alt på billedet):
        #produkt-billede (src og alt), #produkt-navn, #produkt-pris (fx "79 kr"),
        #produkt-badge (tekst + klassen "badge--makeup" eller "badge--hudpleje"),
        #tekst-hvad, #tekst-saadan, #tekst-tryg,
        #citat-tekst, #citat-navn
      Skift også fanen:  document.title = navn + " – MUSE";

   EKSTRA (kun hvis I har tid):
   - "Læg i kurv" (#laeg-i-kurv): giv #besked teksten "Lagt i kurven ✓" og klassen
     "besked--vis", og fjern klassen igen efter 2 sekunder (setTimeout).
   - "Du vil også elske": tegn de andre produkter i #mere med samme kort som
     i shoppen (men med h3), og fjern hidden på #mere-sektion.
   ========================================================= */
