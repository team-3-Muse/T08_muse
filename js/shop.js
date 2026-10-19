/* =========================================================
   shop.js – TEAM: koden til shop.html (listevisning)
   ---------------------------------------------------------
   SKAL LAVES (kravene i opgaven) – i denne rækkefølge:

   1. Læs kategorien fra adressen:
        const params = new URLSearchParams(window.location.search);
        const kategori = params.get("kategori");   // "makeup", "hudpleje" eller null

   2. Hent produkterne med fetch:
        https://dummyjson.com/products/category/beauty      (makeup)
        https://dummyjson.com/products/category/skin-care   (hudpleje)
      og vores egne tekster fra  data/produkter.json
      (nøglen i produkter.json er produktets id i DummyJSON).

   3. Behold kun de produkter, hvis id står i produkter.json
      (1, 2, 3, 4, 5, 118, 119, 120 – de har billeder).
      Navn, pris, billede, badge, form og kategori tager I fra produkter.json.

   4. Er der valgt en kategori? Så vis kun produkter med den kategori.

   5. Lav HTML til hvert kort (skabelonen herunder), læg dem sammen i en
      tekst og sæt den ind med  document.querySelector("#produkter").innerHTML = …

   6. Skriv antallet i #antal, fx "8 produkter".

   EKSTRA (kun hvis I har tid):
   - Marker den valgte chip med  setAttribute("aria-current", "page")
   - Skift overskriften #shop-titel til "Makeup" / "Hudpleje"
   - Filter på pris (input[name="pris"]) og sortering (#sorter)
   - Skriv en fejlbesked i #antal, hvis fetch fejler (.catch)

   SKABELON TIL ÉT KORT (byt de faste værdier ud med produktets egne):
     <li class="kort">
       <a class="kort__link" href="produkt.html?id=4">
         <span class="kort__billede shape-scallop">
           <img src="img/products/red-lipstick.webp" alt="..." width="850" height="1050" loading="lazy">
         </span>
         <h2 class="kort__navn">Red Lipstick</h2>
         <span class="kort__pris">79 kr</span>
       </a>
       <span class="badge badge--makeup">Blød & fugtig</span>
     </li>
   ("shape-" + form giver formen, "badge--" + kategori giver farven)
   ========================================================= */
