const productId = new URLSearchParams(window.location.search).get("id");
const endpoint = "https://dummyjson.com/products/" + productId;
const productImage = document.querySelector("#produkt-billede");
const productName = document.querySelector("#produkt-navn");
const productPrice = document.querySelector("#produkt-pris");
const productBadge = document.querySelector("#produkt-badge");
const whatText = document.querySelector("#tekst-hvad");
const howText = document.querySelector("#tekst-saadan");
const safetyText = document.querySelector("#tekst-tryg");
const quoteText = document.querySelector("#citat-tekst");
const quoteName = document.querySelector("#citat-navn");

fetch(endpoint)
  .then((response) => response.json())
  .then((apiProduct) => {
    console.log(apiProduct);

    fetch("data/produkter.json")
      .then((response) => response.json())
      .then((products) => {
        const product = products[apiProduct.id];

        productImage.src = product.billede;
        productImage.alt = product.alt;
        productName.textContent = product.navn;
        productPrice.textContent = `${product.pris} kr`;
        productBadge.textContent = product.badge;
        productBadge.className = `badge badge--${product.kategori}`;
        whatText.textContent = product.hvad;
        howText.textContent = product.saadan;
        safetyText.textContent = product.tryg;
        quoteText.textContent = product.citat;
        quoteName.textContent = product.citatNavn;

        document.title = `${product.navn} – MUSE`;
      });
  });

// denne fil håndterer indlæsning og visning af et enkelt produkt baseret på ID fra URL'en
