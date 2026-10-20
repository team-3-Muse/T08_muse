const API = "https://dummyjson.com/products";
const productList = document.querySelector("#produkter");
const productCount = document.querySelector("#antal");
const emptyMessage = document.querySelector("#set-alle");
const categoryTitle = document.querySelector("#shop-titel");
const categoryLinks = document.querySelectorAll("[data-kategori]");
const priceFilters = document.querySelectorAll('input[name="pris"]');
const sortSelect = document.querySelector("#sorter");

const categoryEndpoints = {
  makeup: `${API}/category/beauty`,
  hudpleje: `${API}/category/skin-care`,
};

let allProducts = [];
let priceFilter = "alle";
let sortOrder = sortSelect ? sortSelect.value : "populaer";

async function loadShop() {
  if (!productList || !productCount || !emptyMessage || !categoryTitle || !sortSelect) {
    throw new Error("Shop HTML is missing a required element.");
  }

  const params = new URLSearchParams(window.location.search);
  const category = params.get("kategori") || "alle";
  if (!["alle", "makeup", "hudpleje"].includes(category)) {
    throw new Error("Unknown product category.");
  }

  const localResponse = await fetch("data/produkter.json");
  if (!localResponse.ok) throw new Error("Could not load data/produkter.json.");
  const localProducts = await localResponse.json();

  const requestedCategories = category === "alle" ? Object.keys(categoryEndpoints) : [category];
  const responses = await Promise.all(requestedCategories.map((name) => fetch(categoryEndpoints[name])));
  if (responses.some((response) => !response.ok)) {
    throw new Error("Could not load products from DummyJSON.");
  }

  const results = await Promise.all(responses.map((response) => response.json()));
  const apiProducts = results.flatMap((result) => result.products || []);
  allProducts = apiProducts
    .filter((product) => {
      const localProduct = localProducts[product.id];
      return localProduct && requestedCategories.includes(localProduct.kategori);
    })
    .map((product) => ({ ...product, ...localProducts[product.id] }));

  categoryTitle.textContent = category === "alle" ? "Shop" : category === "makeup" ? "Makeup" : "Hudpleje";
  categoryLinks.forEach((link) => {
    if (link.dataset.kategori === category) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  renderProducts();
}

function renderProducts() {
  let visibleProducts = allProducts.filter((product) => {
    if (priceFilter === "under100") return product.pris < 100;
    if (priceFilter === "over100") return product.pris >= 100;
    return true;
  });

  visibleProducts = [...visibleProducts].sort((a, b) => {
    if (sortOrder === "billig") return a.pris - b.pris;
    if (sortOrder === "dyr") return b.pris - a.pris;
    return a.populaer - b.populaer;
  });

  productList.replaceChildren();
  productCount.textContent = `${visibleProducts.length} produkter`;
  emptyMessage.textContent = visibleProducts.length ? "" : "Ingen produkter matcher dit filter.";

  visibleProducts.forEach((product) => {
    productList.append(createProductCard(product));
  });
}

function createProductCard(product) {
  const item = document.createElement("li");
  item.className = "kort";

  const link = document.createElement("a");
  link.className = "kort__link";
  link.href = `produkt.html?id=${encodeURIComponent(product.id)}`;

  const imageFrame = document.createElement("span");
  imageFrame.className = `kort__billede shape-${product.form}`;
  const image = document.createElement("img");
  image.src = product.billede;
  image.alt = product.alt;
  image.width = 850;
  image.height = 1050;
  image.loading = "lazy";
  imageFrame.append(image);

  const name = document.createElement("h2");
  name.className = "kort__navn";
  name.textContent = product.navn;

  const price = document.createElement("span");
  price.className = "kort__pris";
  price.textContent = `${product.pris} kr`;

  const badge = document.createElement("span");
  badge.className = `badge badge--${product.kategori}`;
  badge.textContent = product.badge;

  link.append(imageFrame, name, price);
  item.append(link, badge);
  return item;
}

priceFilters.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) {
      priceFilter = input.value;
      renderProducts();
    }
  });
});

if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    sortOrder = sortSelect.value;
    renderProducts();
  });
}

loadShop().catch((error) => {
  console.error("Could not load the shop:", error);
  if (productList) productList.replaceChildren();
  if (productCount) productCount.textContent = "Produkterne kunne ikke indlæses.";
  if (emptyMessage) emptyMessage.textContent = "Kontrollér forbindelsen, og prøv igen.";
});

// denne js fil håndterer indlæsning, filtrering og visning af produkter i shoppen
