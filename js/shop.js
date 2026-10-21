const API = "https://dummyjson.com/products";
const productList = document.querySelector("#produkter");
const productCount = document.querySelector("#antal");
const categoryTitle = document.querySelector("#shop-titel");
const categoryButtons = document.querySelectorAll(".chips [data-kategori]");
const message = document.querySelector("#besked");
const priceFilters = document.querySelectorAll('input[name="pris"]');
const sortSelect = document.querySelector("#sorter");

const params = new URLSearchParams(window.location.search);
let category = params.get("kategori") || "alle";

if (category !== "makeup" && category !== "hudpleje") {
  category = "alle";
}

categoryButtons.forEach((button) => {
  if (button.getAttribute("data-kategori") === category) {
    button.setAttribute("aria-current", "page");
  } else {
    button.removeAttribute("aria-current");
  }
});

let endpoint = `${API}?limit=0`;

if (category === "makeup") {
  endpoint = `${API}/category/beauty`;
} else if (category === "hudpleje") {
  endpoint = `${API}/category/skin-care`;
}

let allProducts = [];
let priceFilter = "alle";
let sortOrder = sortSelect.value;

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    fetch("data/produkter.json")
      // Hent MUSE-oplysningerne lokalt efter produktlisten fra DummyJSON.
      .then((response) => response.json())
      // Læser JSON-svaret, så opslaget kan bruges som JavaScript-data.
      .then((localProducts) => {
        const apiProducts = data.products.filter((product) => {
          const localProduct = localProducts[product.id];
          // Finder MUSE-produktet med samme id som API-produktet.
          return localProduct && (category === "alle" || localProduct.kategori === category);
          // Beholder kun match, der passer til den valgte kategori.
        });

        allProducts = apiProducts.map((product) => {
          const localProduct = localProducts[product.id];
          // Finder de MUSE-oplysninger, der skal vises for dette produkt.
          return {
            id: product.id,
            // Beholder DummyJSON-id'et, som produktlinket bruger.
            category: product.category,
            // Beholder produktets kategori fra DummyJSON.
            title: localProduct.navn,
            // Viser MUSE-navnet på kortet.
            price: localProduct.pris,
            // Viser prisen fra projektets lokale data.
            rating: localProduct.populaer,
            // Bruger den lokale værdi ved sortering.
            thumbnail: localProduct.billede,
            // Bruger billedstien fra den lokale produktfil.
            alt: localProduct.alt,
            // Giver billedet en beskrivelse til skærmlæsere.
            badge: localProduct.badge,
            // Viser MUSE-badget på produktkortet.
            localCategory: localProduct.kategori,
            // Bruger den lokale kategori til badgets stil.
            form: localProduct.form,
            // Bruger den lokale form til CSS-klassen omkring billedet.
          };
        });

        if (category === "makeup") {
          categoryTitle.textContent = "Makeup";
        } else if (category === "hudpleje") {
          categoryTitle.textContent = "Hudpleje";
        } else {
          categoryTitle.textContent = "Shop";
        }

        renderProducts();
      });
  })
  .catch(() => {
    productList.innerHTML = "";
    productCount.textContent = "Produkterne kunne ikke hentes.";
    message.textContent = "Produkterne kunne ikke hentes. Prøv igen senere.";
    message.classList.add("besked--vis");
  });

function renderProducts() {
  let visibleProducts = allProducts.filter((product) => {
    if (priceFilter === "under100") {
      return product.price < 100;
    } else if (priceFilter === "over100") {
      return product.price >= 100;
    } else {
      return true;
    }
  });

  visibleProducts = [...visibleProducts].sort((a, b) => {
    if (sortOrder === "billig") {
      return a.price - b.price;
    } else if (sortOrder === "dyr") {
      return b.price - a.price;
    } else {
      return a.rating - b.rating;
    }
  });

  let markup = "";
  visibleProducts.forEach((product) => {
    markup += createProductCard(product);
  });

  productList.innerHTML = markup;
  productCount.textContent = `${visibleProducts.length} produkter`;
}

function createProductCard(product) {
  const categoryClass = product.localCategory;
  // Klassen til badget følger produktets lokale MUSE-kategori.

  return `
    <li class="kort">
      <a class="kort__link" href="produkt.html?id=${product.id}">
        <span class="kort__billede shape-${product.form}">
          <!-- Klassen former billedfeltet efter MUSE-data. -->
          <img src="${product.thumbnail}" alt="${product.alt}" width="850" height="1050" loading="lazy">
          <!-- Billedsti og beskrivelse kommer fra den lokale produktfil. -->
        </span>
        <h2 class="kort__navn">${product.title}</h2>
        <span class="kort__pris">${product.price} kr</span>
      </a>
      <span class="badge badge--${categoryClass}">${product.badge}</span>
      <!-- Badge-tekst og kategoriens styling kommer fra MUSE-data. -->
    </li>
  `;
}

priceFilters.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) {
      priceFilter = input.value;
      renderProducts();
    }
  });
});

sortSelect.addEventListener("change", () => {
  sortOrder = sortSelect.value;
  renderProducts();
});

// DummyJSON leverer produkt-id og kategori; lokale MUSE-data leverer kortenes indhold.
