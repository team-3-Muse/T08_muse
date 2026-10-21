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
    if (category === "alle") {
      allProducts = data.products.filter((product) => product.category === "beauty" || product.category === "skin-care");
    } else {
      allProducts = data.products;
    }

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
      return b.rating - a.rating;
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
  const categoryClass = product.category === "beauty" ? "makeup" : "hudpleje";

  return `
    <li class="kort">
      <a class="kort__link" href="produkt.html?id=${product.id}">
        <span class="kort__billede">
          <img src="${product.thumbnail}" alt="${product.title}" width="850" height="1050" loading="lazy">
        </span>
        <h2 class="kort__navn">${product.title}</h2>
        <span class="kort__pris">${product.price} DKK</span>
      </a>
      <span class="badge badge--${categoryClass}">${product.brand || product.category}</span>
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

// Denne JS-fil indlæser, filtrerer, sorterer og viser produkter fra DummyJSON.
// mangler at have billeder fra prototypen. kan eventuelt finde en måde at integrere content, men api'et. det må jeg lige se på
