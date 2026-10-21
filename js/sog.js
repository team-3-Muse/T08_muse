/* =========================================================
   sog.js – TEAM: koden til sog.html
   ---------------------------------------------------------
   HELE SØGESIDEN ER EKSTRA – den er ikke et krav i opgaven.
   Lav shop, produkt og kontakt først.

   Hvis I har tid:
   1. Hent produkterne som i shop.js.
   2. Lyt efter "input" på #soeg. Vis de produkter, hvor navnet (eller "soegeord"
      fra produkter.json) indeholder det, man skriver (toLowerCase + includes).
   3. Tegn resultaterne i #resultater, og skriv antallet i #antal.
   4. Intet fundet: fjern hidden på #ingen og skriv ordet i #ingen-ord.
   ========================================================= */

const API = "https://dummyjson.com/products";
const searchInput = document.querySelector("#soeg");
const clearButton = document.querySelector("#ryd");
const categoryButtons = document.querySelectorAll("[data-kategori]");
const resultCount = document.querySelector("#antal");
const resultList = document.querySelector("#resultater");
const emptyState = document.querySelector("#ingen");
const emptyWord = document.querySelector("#ingen-ord");
const seeAllLink = document.querySelector("#se-alle");
const suggestionButtons = document.querySelectorAll(".forslag");

const params = new URLSearchParams(window.location.search);
searchInput.value = params.get("q") || "";

let allProducts = [];
let selectedCategory = "alle";

let museData = {};

// Blander et DummyJSON-produkt med vores egne data fra produkter.json
function mergeProduct(product) {
  const mine = museData[product.id];
  return {
    id: product.id,
    category: mine.kategori, // "makeup" eller "hudpleje"
    title: mine.navn,
    price: mine.pris,
    image: mine.billede,
    alt: mine.alt,
    searchWords: mine.soegeord
  };
}

// 1. Hent vores egne data  2. Hent DummyJSON  3. Behold kun vores 8 produkter
fetch("data/produkter.json")
  .then((response) => response.json())
  .then((data) => {
    museData = data;
    return fetch(`${API}?limit=0`);
  })
  .then((response) => response.json())
  .then((data) => {
    allProducts = data.products
      .filter((product) => museData[product.id])
      .map(mergeProduct);
    renderResults();
  })
  .catch(() => {
    resultCount.textContent = "Produkterne kunne ikke hentes lige nu. Prøv igen om lidt.";
  });

function renderResults() {
  const searchWord = searchInput.value.trim().toLowerCase();

  const visibleProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === "alle" || product.category === selectedCategory;
    const matchesName = product.title.toLowerCase().includes(searchWord) || product.searchWords.includes(searchWord);

    return matchesCategory && matchesName;
  });

  let resultMarkup = "";

  visibleProducts.forEach((product) => {
    resultMarkup += createProductResult(product);
  });

  resultList.innerHTML = resultMarkup;

  if (searchWord) {
    resultCount.textContent = `${visibleProducts.length} resultater for "${searchInput.value.trim()}"`;
  } else {
    resultCount.textContent = `${visibleProducts.length} produkter`;
  }

  emptyState.hidden = visibleProducts.length > 0;
  emptyWord.textContent = searchInput.value.trim();

  if (visibleProducts.length === 0) {
    seeAllLink.classList.remove("knap--hvid");
  } else {
    seeAllLink.classList.add("knap--hvid");
  }
}

function createProductResult(product) {
  return `
    <li>
      <a class="resultat" href="produkt.html?id=${product.id}">
        <img class="resultat__billede" src="${product.image}" alt="${product.alt}">
        <span class="resultat__tekst">
          <span class="resultat__navn">${product.title}</span>
          <span>${product.price} kr</span>
        </span>
      </a>
    </li>
  `;
}

searchInput.addEventListener("input", renderResults);

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  renderResults();
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.getAttribute("data-kategori");

    categoryButtons.forEach((categoryButton) => {
      categoryButton.setAttribute("aria-pressed", categoryButton === button ? "true" : "false");
    });

    renderResults();
  });
});

suggestionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    searchInput.value = button.textContent.trim();
    renderResults();
  });
});

// beskrivelser:
// her har vi gjort det muligt at søge, filtrere og vise produkter baseret på brugerens input og valgte kategori
// koden virker sådan her: brugeren indtaster en søgeforespørgsel, vælger en kategori, og resultaterne opdateres dynamisk baseret på disse kriterier.

// js kode gloser:
//const er en måde at erklære en variabel på, som ikke kan ændres senere i koden.
//let er en måde at erklære en variabel på, som kan ændres senere i koden.
// function er en måde at erklære en funktion på, som kan genbruges flere steder i koden.
// addEventListener er en metode, der bruges til at tilføje en hændelseslytter til et HTML-element, så man kan reagere på brugerinteraktioner som klik eller input.
// forEach er en metode, der bruges til at iterere over en liste af elementer og udføre en funktion for hvert element.
// hidden er en egenskab, der bruges til at skjule eller vise et HTML-element baseret på en betingelse.
// classList er en egenskab, der bruges til at tilføje, fjerne eller kontrollere CSS-klasser på et HTML-element.
// template literals (``) er en måde at indsætte variabler og udtryk direkte i en streng ved hjælp af ${}.
// trim() er en metode, der fjerner mellemrum fra starten og slutningen af en streng.
// querySelector er en metode, der bruges til at vælge det første HTML-element, der matcher en CSS-selector.
// getAttribute er en metode, der bruges til at hente værdien af et attribut på et HTML-element.
// setAttribute er en metode, der bruges til at sætte værdien af et attribut på et HTML-element.
// addEventListener er en metode, der bruges til at tilføje en hændelseslytter til et HTML-element, så man kan reagere på brugerinteraktioner som klik eller input.
// textContent er en egenskab, der bruges til at få eller sætte teksten inde i et HTML-element.
// aria-pressed er en egenskab, der bruges til at angive, om en knap er trykket ned eller ej, hvilket er nyttigt for tilgængelighed.
