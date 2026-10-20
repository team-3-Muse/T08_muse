const productId = new URLSearchParams(window.location.search).get("id");
const endpoint = "https://dummyjson.com/products/" + encodeURIComponent(productId || "");
const productImage = document.querySelector("#produkt-billede");
const productName = document.querySelector("#produkt-navn");
const productPrice = document.querySelector("#produkt-pris");
const productBadge = document.querySelector("#produkt-badge");
const whatText = document.querySelector("#tekst-hvad");
const howText = document.querySelector("#tekst-saadan");
const safetyText = document.querySelector("#tekst-tryg");
const quoteText = document.querySelector("#citat-tekst");
const quoteName = document.querySelector("#citat-navn");
const productSection = document.querySelector("#produkt");
const accordionSection = document.querySelector("#accordions");
const quoteSection = document.querySelector("#citat");

productSection.hidden = true;
accordionSection.hidden = true;
quoteSection.hidden = true;

fetch(endpoint)
  .then((response) => response.json())
  .then((product) => {
    const categoryClass = product.category === "beauty" ? "makeup" : "hudpleje";
    const review = product.reviews && product.reviews[0];

    productImage.src = product.thumbnail;
    productImage.alt = product.title;
    productName.textContent = product.title;
    productPrice.textContent = `$ ${product.price}`;
    productBadge.textContent = product.brand || product.category;
    productBadge.className = `badge badge--${categoryClass}`;
    whatText.textContent = product.description;
    howText.parentElement.hidden = true;
    safetyText.parentElement.hidden = true;
    document.title = `${product.title} – MUSE`;

    productSection.hidden = false;
    accordionSection.hidden = false;

    if (review) {
      quoteText.textContent = review.comment;
      quoteName.textContent = review.reviewerName;
      quoteSection.setAttribute("aria-label", "Kundeanmeldelse fra DummyJSON");
      quoteSection.hidden = false;
    }
  });

// denne fil håndterer indlæsning og visning af et enkelt produkt baseret på ID fra URL'en
