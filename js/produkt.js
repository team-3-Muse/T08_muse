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
        showMore();
      });
  })
  .catch(showNotFound);
// "Gem"-knappen: skifter mellem Gem og Gemt ♥ og viser en lille besked
const saveButton = document.querySelector("#gem");
const message = document.querySelector("#besked");

saveButton.addEventListener("click", () => {
  const saved = saveButton.getAttribute("aria-pressed") === "true";
  saveButton.setAttribute("aria-pressed", saved ? "false" : "true");
  saveButton.textContent = saved ? "Gem" : "Gemt ♥";
  message.textContent = saved ? "Fjernet fra dine favoritter" : "Gemt i dine favoritter ♥";
  message.classList.add("besked--vis");
  setTimeout(() => message.classList.remove("besked--vis"), 2000);
});

// "Læg i kurv"-knappen: viser en lille besked nederst
const cartButton = document.querySelector("#laeg-i-kurv");

cartButton.addEventListener("click", () => {
  message.textContent = "Lagt i kurven ✓";
  message.classList.add("besked--vis");
  setTimeout(() => message.classList.remove("besked--vis"), 2000);
});

// "Du vil også elske": viser de andre produkter fra vores egen produkter.json
function showMore() {
  const moreList = document.querySelector("#mere");
  const moreSection = document.querySelector("#mere-sektion");
  let markup = "";

  Object.values(museData).forEach((p) => {
    if (String(p.id) !== productId) {
      markup += `
        <li class="kort">
          <a class="kort__link" href="produkt.html?id=${p.id}">
            <span class="kort__billede shape-${p.form}">
              <img src="${p.billede}" alt="${p.alt}" width="850" height="1050" loading="lazy">
            </span>
            <h3 class="kort__navn">${p.navn}</h3>
            <span class="kort__pris">${p.pris} kr</span>
          </a>
          <span class="badge badge--${p.kategori}">${p.badge}</span>
        </li>`;
    }
  });

  moreList.innerHTML = markup;
  moreSection.hidden = false;
}
