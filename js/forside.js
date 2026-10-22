// forside.js – pilene på video-karrusellen (kun på mobil, CSS skjuler dem på større skærme)

const track = document.querySelector("#videoer .karrusel__spor");
const leftArrow = document.querySelector("#videoer .pil--venstre");
const rightArrow = document.querySelector("#videoer .pil--hoejre");

// Ét klik = flyt én skærmbredde til venstre eller højre
leftArrow.addEventListener("click", () => {
  track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
});

rightArrow.addEventListener("click", () => {
  track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
});

// Gør pilen grå (disabled), når man er helt i starten eller helt i slutningen
function updateArrows() {
  leftArrow.disabled = track.scrollLeft <= 0;
  rightArrow.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
}

track.addEventListener("scroll", updateArrows);
updateArrows();
