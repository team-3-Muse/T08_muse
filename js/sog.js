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

fetch(`${API}?limit=0`)
  // Henter produktlisten fra DummyJSON.
  .then((response) => response.json())
  // Læser produktlisten som JSON-data.
  .then((data) => {
    // Giver adgang til produkterne fra DummyJSON.
    fetch("data/produkter.json")
      // Henter MUSE-oplysningerne fra projektets lokale produktfil.
      .then((response) => response.json())
      // Læser den lokale produktfil som JSON-data.
      .then((localProducts) => {
        // Giver adgang til MUSE-oplysningerne.
        allProducts = data.products
          // Starter med produkterne fra DummyJSON.
          .filter((product) => localProducts[product.id] && (product.category === "beauty" || product.category === "skin-care"))
          // Beholder kun produkter, som findes i MUSE-filen, og som hører til makeup eller hudpleje.
          .map((product) => {
            // Gør hvert produkt klar med MUSE-oplysningerne.
            const localProduct = localProducts[product.id];
            // Finder MUSE-oplysningerne med samme id som DummyJSON-produktet.
            return {
              // Samler oplysningerne, som søgeresultatet skal vise.
              id: product.id,
              // Beholder produktets id til linket til produktsiden.
              title: localProduct.navn,
              // Bruger produktnavnet fra MUSE-filen.
              category: localProduct.kategori,
              // Bruger MUSE-kategorien til kategorifilteret.
              price: localProduct.pris,
              // Bruger MUSE-prisen.
              thumbnail: localProduct.billede,
              // Bruger MUSE-billedet.
              alt: localProduct.alt,
              // Bruger MUSE-billedets beskrivende tekst.
              keywords: localProduct.soegeord,
              // Bruger MUSE-søgeordene sammen med produktnavnet.
            };
            // Afslutter det samlede produkt til søgeresultatet.
          });
        // Afslutter udvælgelsen og tilpasningen af produktlisten.
        renderResults();
        // Viser de produkter, der passer til søgningen og kategorien.
      });
    // Afslutter indlæsningen af MUSE-oplysningerne.
  });
// Afslutter indlæsningen af produktdata.

function renderResults() {
  const searchWord = searchInput.value.trim().toLowerCase();

  const visibleProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === "alle" || product.category === selectedCategory;
    // Tjekker om produktet passer til den valgte MUSE-kategori.
    const matchesName = product.title.toLowerCase().includes(searchWord) || product.keywords.toLowerCase().includes(searchWord);
    // Tjekker om søgeordet findes i produktnavnet eller MUSE-søgeordene.

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
        <img class="resultat__billede" src="${product.thumbnail}" alt="${product.alt}">
        <span class="resultat__tekst">
          <span class="resultat__navn">${product.title}</span>
          <span>${product.price} DKK</span>
        </span>
      </a>
    </li>
  `;
  // Tegner søgeresultatet med MUSE-billede, navn, billedtekst og pris.
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
