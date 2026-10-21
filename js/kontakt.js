/* =========================================================
   kontakt.js – TEAM: koden til kontakt.html
   ---------------------------------------------------------
   Formularen virker allerede UDEN JavaScript: HTML-valideringen
   (required, type="email", pattern, minlength) står i HTML'en, og browseren
   viser selv sine fejlbeskeder. Det opfylder kravet "html-valideret formular".

   SKAL LAVES:
   1. Lyt efter "submit" på #kontakt-form, og start med  event.preventDefault();
   2. Hvis  form.checkValidity()  er true:
        - skjul formularen (hidden = true)
        - vis #tak (hidden = false)
        - skriv "Tak, " + navnet i #tak-titel

   EKSTRA (kun hvis I har tid):
   - Egne danske fejlbeskeder: skriv novalidate på <form>, tjek hvert felt med
     checkValidity(), skriv fejlen i feltets .felt__fejl og sæt aria-invalid="true".
   - Fejloversigt øverst: fjern hidden på #fejloversigt og fyld #fejl-liste med links.
   - Linket "privatlivspolitik" åbner accordionen:  details.open = true
   ========================================================= */

const form = document.querySelector("#kontakt-form");
const tak = document.querySelector("#tak");
const takTitel = document.querySelector("#tak-titel");

function handleSubmit(event) {
  event.preventDefault();

  if (form.checkValidity()) {
    const formData = new FormData(form);
    form.hidden = true;
    tak.hidden = false;
    takTitel.textContent = "Tak, " + formData.get("navn");
  }
}

form.addEventListener("submit", handleSubmit);

// denne js fungere på denne måde:
// - Lytter efter submit på kontaktformularen.
// - Forhindrer standardformularens afsendelse.
// - Tjekker om formularen er valid.
// - Hvis valid: skjuler formularen, viser tak-beskeden og indsætter navnet i tak-titlen.
