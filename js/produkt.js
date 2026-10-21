const productId = new URLSearchParams(window.location.search).get("id");
const endpoint = `https://dummyjson.com/products/${productId}`;
const productImage = document.querySelector("#produkt-billede");
const productName = document.querySelector("#produkt-navn");
const productPrice = document.querySelector("#produkt-pris");
const productBadge = document.querySelector("#produkt-badge");
const whatText = document.querySelector("#tekst-hvad");
// Finder feltet til teksten om, hvad produktet gør.
const howText = document.querySelector("#tekst-saadan");
// Finder feltet med vejledning til brug.
const safetyText = document.querySelector("#tekst-tryg");
// Finder feltet med tekst om tryghed.
const quoteText = document.querySelector("#citat-tekst");
const quoteName = document.querySelector("#citat-navn");
const productSection = document.querySelector("#produkt");
const accordionSection = document.querySelector("#accordions");
const quoteSection = document.querySelector("#citat");
const notFound = document.querySelector("#ikke-fundet");
// Finder beskeden "Produktet findes ikke".

productSection.hidden = true;
accordionSection.hidden = true;
quoteSection.hidden = true;

// Viser "Produktet findes ikke", hvis id'et mangler eller ikke er et af vores 8 produkter.
function showNotFound() {
  notFound.hidden = false;
  document.title = "Produktet findes ikke – MUSE";
}

fetch(endpoint)
  .then((response) => response.json())
  .then((product) => {
    fetch("data/produkter.json")
      // Hent den lokale fil, som rummer MUSE-tekster og billedstier.
      .then((response) => response.json())
      .then((localProducts) => {
        // Slå MUSE-produktet op med id'et fra DummyJSON.
        const localProduct = localProducts[product.id];
        if (!localProduct) {
          showNotFound();
          return;
        }
        // Udfyld ikke siden, hvis id'et ikke har lokale MUSE-oplysninger.

        productImage.src = localProduct.billede;
        // Bruger billedfilens sti fra den lokale produktliste.
        productImage.alt = localProduct.alt;
        // Giver billedet en dansk beskrivelse til skærmlæsere.
        productName.textContent = localProduct.navn;
        // Viser MUSE-produktets navn.
        productPrice.textContent = `${localProduct.pris} kr`;
        // Viser den lokale pris.
        productBadge.textContent = localProduct.badge;
        // Viser MUSE-badget.
        productBadge.className = `badge badge--${localProduct.kategori}`;
        // Vælger badge-styling ud fra den lokale kategori.
        whatText.textContent = localProduct.hvad;
        // Sætter teksten om produktets virkning ind.
        howText.textContent = localProduct.saadan;
        // Sætter vejledningen til brug ind.
        safetyText.textContent = localProduct.tryg;
        // Sætter teksten om tryghed ind.
        quoteText.textContent = localProduct.citat;
        // Viser produktcitatet.
        quoteName.textContent = localProduct.citatNavn;
        // Viser navnet på den, der har skrevet citatet.
        document.title = `${localProduct.navn} – MUSE`;
        // Sætter produktnavnet i browserfanens titel.

        productSection.hidden = false;
        // Viser produktområdet efter at det er udfyldt.
        accordionSection.hidden = false;
        // Viser de tre tekstafsnit.
        quoteSection.hidden = false;
        // Viser citatet.
        showMore(localProducts);
        // Viser "Du vil også elske" med de andre produkter.
      });
  })
  .catch(showNotFound);
// Viser "Produktet findes ikke", hvis noget går galt.

// "Du vil også elske": viser de andre produkter fra vores egen produkter.json
function showMore(localProducts) {
  const moreList = document.querySelector("#mere");
  const moreSection = document.querySelector("#mere-sektion");
  let markup = "";

  Object.values(localProducts).forEach((p) => {
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

// denne fil håndterer indlæsning og visning af et enkelt produkt baseret på ID fra URL'en
// dummyjson i forhold til kokalfil: vi henter produktdata fra DummyJSON, men bruger den lokale fil til MUSE-specifikke oplysninger som navn, pris, billede og badge.
// lokalfilen fungere sådan her:
// {
//   "1": {
//     "navn": "Red Lipstick",
//     "pris": 79,
//     "billede": "img/products/red-lipstick.webp",
//     "alt": "Åben pink Red Lipstick med rød stift og låget ved siden af foran et stort præget M i en lyserød væg",
//     "badge": "Blød & fugtig",
//     "kategori": "makeup",
//     "hvad": "En klassisk rød farve med en blød og fugtig formel, der ikke tørrer læberne ud.",
//     "saadan": "Start midt på læben og arbejd ud mod mundvigene. Dup med fingeren for et blødere look.",
//     "tryg": "Cremet formel med fugt. Ingen stærk duft.",
//     "citat": "Den føles slet ikke tør. Jeg bruger den hver dag.",
//     "citatNavn": "Ida, 15 år"
//   }
// }

// kilder:
// - DummyJSON: https://dummyjson.com/
// - Lokale MUSE-produktdata: data/produkter.json
