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
// searchInput: input-feltet hvor brugeren skriver søgeordet.
// renderResults: funktion der opdaterer søgeresultaterne baseret på søgeord og kategori.
// visibleProducts: listen af produkter der matcher søgeord og kategori.
// createProductResult: funktion der genererer HTML for et enkelt søgeresultat.
// resultList: elementet hvor søgeresultaterne vises.
// resultCount: elementet der viser antal resultater.
// emptyState: elementet der vises når ingen produkter matcher.
// emptyWord: elementet der viser det søgte ord når ingen produkter matcher.
// seeAllLink: linket til at se alle produkter.
// categoryButtons: knapperne til at vælge produktkategori.
// suggestionButtons: knapperne med forslag til søgeord.
// selectedCategory: den aktuelt valgte kategori.
