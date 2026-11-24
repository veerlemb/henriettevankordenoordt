(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("hoofdmenu");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      if (!open) {
        var first = nav.querySelector("a");
        if (first) first.focus();
      }
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  var dialog = document.getElementById("lightbox");
  var lightImg = document.getElementById("lightbox-img");

  if (dialog && lightImg) {
    document.querySelectorAll(".shot").forEach(function (button) {
      button.addEventListener("click", function () {
        var thumb = button.querySelector("img");
        var alt = thumb ? thumb.getAttribute("alt") || "" : "";
        lightImg.src = button.getAttribute("data-src");
        lightImg.alt = alt;
        dialog.setAttribute("aria-label", alt || "Vergrote foto");
        if (typeof dialog.showModal === "function") dialog.showModal();
      });
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
  }

  var form = document.getElementById("afspraak-form");
  var status = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    // Altijd het e-mailprogramma openen, op elke gratis host.
    // Wil je dat Netlify het formulier zelf bewaart, haal dan de
    // regel event.preventDefault() hieronder weg. Uitleg: README.md
    event.preventDefault();

    var data = new FormData(form);
    if (String(data.get("bot-field") || "").trim() !== "") return;

    var naam = String(data.get("naam") || "").trim();
    var email = String(data.get("email") || "").trim();
    var telefoon = String(data.get("telefoon") || "").trim();
    var dienst = String(data.get("dienst") || "").trim();
    var geboorte = String(data.get("geboorte") || "").trim();
    var bericht = String(data.get("bericht") || "").trim();

    var body = [
      "Hallo Henriette,",
      "",
      "Naam: " + naam,
      "E-mail: " + email,
      "Telefoon: " + (telefoon || "—"),
      "Waarvoor: " + (dienst || "—"),
      "Geboortegegevens: " + (geboorte || "—"),
      "",
      bericht,
      "",
      "Groet,",
      naam
    ].join("\n");

    window.location.href =
      "mailto:henrietkorden@gmail.com?subject=" +
      encodeURIComponent("Afspraakverzoek: " + (dienst || "consult")) +
      "&body=" +
      encodeURIComponent(body);

    if (status) {
      status.hidden = false;
      status.textContent =
        "Je e-mailprogramma zou nu open moeten gaan met een ingevuld bericht. Lukt dat niet, mail dan direct naar henrietkorden@gmail.com.";
    }
  });
})();
