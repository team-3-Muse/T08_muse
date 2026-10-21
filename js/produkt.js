// produkt.js – viser ét produkt ud fra ?id= i adressen, fx produkt.html?id=4
// Billede, navn, pris, badge, tekster og citat kommer fra VORES data/produkter.json.
// DummyJSON bruges til at tjekke, at produktet findes (og giver id og rating).

const productId = new URLSearchParams(window.location.search).get("id");
const endpoint = `https://dummyjson.com/products/${productId}`;
const productImage = document.querySelector("#produkt-billede");
const productName = document.querySelector("#produkt-navn");
const productPrice = document.querySelector("#produkt-pris");
const productBadge = document.querySelector("#produkt-badge");
const textWhat = document.querySelector("#tekst-hvad");
const textHow = document.querySelector("#tekst-saadan");
const textSafe = document.querySelector("#tekst-tryg");
const quoteText = document.querySelector("#citat-tekst");
const quoteName = document.querySelector("#citat-navn");
const productSection = document.querySelector("#produkt");
const accordionSection = document.querySelector("#accordions");
const quoteSection = document.querySelector("#citat");
const notFound = document.querySelector("#ikke-fundet");

productSection.hidden = true;
accordionSection.hidden = true;
quoteSection.hidden = true;

// Vises, hvis id'et mangler eller ikke er et af vores 8 produkter
function showNotFound() {
  notFound.hidden = false;
  document.title = "Produktet findes ikke – MUSE";
}

let museData = {};

fetch("data/produkter.json")
  .then((response) => response.json())
  .then((data) => {
    museData = data;

    if (!museData[productId]) {
      showNotFound();
      return;
    }

    return fetch(endpoint)
      .then((response) => response.json())
      .then((product) => {
        const mine = museData[product.id];

        productImage.src = mine.billede;
        productImage.alt = mine.alt;
        productName.textContent = mine.navn;
        productPrice.textContent = `${mine.pris} kr`;
        productBadge.textContent = mine.badge;
        productBadge.className = `badge badge--${mine.kategori}`;
        textWhat.textContent = mine.hvad;
        textHow.textContent = mine.saadan;
        textSafe.textContent = mine.tryg;
        quoteText.textContent = mine.citat;
        quoteName.textContent = mine.citatNavn;
        document.title = `${mine.navn} – MUSE`;

        productSection.hidden = false;
        accordionSection.hidden = false;
        quoteSection.hidden = false;
      });
  })
  .catch(showNotFound);
