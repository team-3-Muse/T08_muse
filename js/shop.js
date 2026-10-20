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
  const params = new URLSearchParams(window.location.search);
  const category = params.get("kategori") || "alle";

  const requestedCategories = category === "alle" ? Object.keys(categoryEndpoints) : [category];
  const responses = await Promise.all(requestedCategories.map((name) => fetch(categoryEndpoints[name])));

  const results = await Promise.all(responses.map((response) => response.json()));
  const apiProducts = results.flatMap((result) => result.products || []);
  allProducts = apiProducts;

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
    if (priceFilter === "under100") return product.price < 100;
    if (priceFilter === "over100") return product.price >= 100;
    return true;
  });

  visibleProducts = [...visibleProducts].sort((a, b) => {
    if (sortOrder === "billig") return a.price - b.price;
    if (sortOrder === "dyr") return b.price - a.price;
    return b.rating - a.rating;
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
  imageFrame.className = "kort__billede";
  const image = document.createElement("img");
  image.src = product.thumbnail;
  image.alt = product.title;
  image.width = 850;
  image.height = 1050;
  image.loading = "lazy";
  imageFrame.append(image);

  const name = document.createElement("h2");
  name.className = "kort__navn";
  name.textContent = product.title;

  const price = document.createElement("span");
  price.className = "kort__pris";
  price.textContent = `$ ${product.price}`;

  const badge = document.createElement("span");
  badge.className = `badge badge--${product.category === "beauty" ? "makeup" : "hudpleje"}`;
  badge.textContent = product.brand || product.category;

  link.append(imageFrame, name, price);
  item.append(link, badge);
  return item;
}

priceFilters.forEach((input) => {
  input.nextSibling.textContent = input.value === "under100" ? " Under $100" : input.value === "over100" ? " $100 og derover" : " Alle priser ($)";
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

loadShop();

// denne js fil håndterer indlæsning, filtrering og visning af produkter i shoppen
