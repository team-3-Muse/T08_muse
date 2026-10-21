// shop.js – henter produkter fra DummyJSON og viser dem med VORES billeder og tekster.
// Vores egne navne, priser, billeder og badges ligger i data/produkter.json.
// Nøglen i filen er produktets id i DummyJSON (1, 2, 3, 4, 5, 118, 119, 120).

const API = "https://dummyjson.com/products";
const productList = document.querySelector("#produkter");
const productCount = document.querySelector("#antal");
const seeAllText = document.querySelector("#set-alle");
const categoryTitle = document.querySelector("#shop-titel");
const priceFilters = document.querySelectorAll('input[name="pris"]');
const sortSelect = document.querySelector("#sorter");

const params = new URLSearchParams(window.location.search);
let category = params.get("kategori") || "alle";

if (category !== "makeup" && category !== "hudpleje") {
  category = "alle";
}

let endpoint = `${API}?limit=0`;

if (category === "makeup") {
  endpoint = `${API}/category/beauty`;
} else if (category === "hudpleje") {
  endpoint = `${API}/category/skin-care`;
}

let allProducts = [];
let priceFilter = "alle";
let sortOrder = sortSelect.value;
let museData = {};

// Marker den valgte kategori-chip (CSS farver den orange/lilla)
document.querySelectorAll(".chip[data-kategori]").forEach((chip) => {
  if (chip.dataset.kategori === category) {
    chip.setAttribute("aria-current", "page");
  }
});

// Blander et DummyJSON-produkt med vores egne data fra produkter.json
function mergeProduct(product) {
  const mine = museData[product.id];
  return {
    id: product.id,
    rating: product.rating,
    category: mine.kategori, // "makeup" eller "hudpleje"
    title: mine.navn,
    price: mine.pris,
    popular: mine.populaer,
    badge: mine.badge,
    form: mine.form,
    image: mine.billede,
    alt: mine.alt
  };
}

// 1. Hent vores egne data  2. Hent DummyJSON  3. Behold kun vores 8 produkter
fetch("data/produkter.json")
  .then((response) => response.json())
  .then((data) => {
    museData = data;
    return fetch(endpoint);
  })
  .then((response) => response.json())
  .then((data) => {
    allProducts = data.products
      .filter((product) => museData[product.id])
      .map(mergeProduct);

    if (category === "makeup") {
      categoryTitle.textContent = "Makeup";
    } else if (category === "hudpleje") {
      categoryTitle.textContent = "Hudpleje";
    } else {
      categoryTitle.textContent = "Shop";
    }

    renderProducts();
  })
  .catch(() => {
    productCount.textContent = "Produkterne kunne ikke hentes lige nu. Prøv igen om lidt.";
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
      return a.popular - b.popular; // "Mest populære" – vores egen rækkefølge
    }
  });

  let markup = "";
  visibleProducts.forEach((product) => {
    markup += createProductCard(product);
  });

  productList.innerHTML = markup;
  productCount.textContent = `${visibleProducts.length} produkter`;
  seeAllText.textContent = `Du har set alle ${visibleProducts.length} produkter.`;
}

function createProductCard(product) {
  return `
    <li class="kort">
      <a class="kort__link" href="produkt.html?id=${product.id}">
        <span class="kort__billede shape-${product.form}">
          <img src="${product.image}" alt="${product.alt}" width="850" height="1050" loading="lazy">
        </span>
        <h2 class="kort__navn">${product.title}</h2>
        <span class="kort__pris">${product.price} kr</span>
      </a>
      <span class="badge badge--${product.category}">${product.badge}</span>
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
