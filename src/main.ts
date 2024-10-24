import { AppPageHero } from "./pages/AppPageHero";
import locales from "./locales.json";

let currentLocale: "en" | "ru" = "en";

function changeLocale() {
  currentLocale = currentLocale === "en" ? "ru" : "en";

  translateAllTextOnPage();
}

function translateAllTextOnPage() {
  const localeMessages = locales[currentLocale]; // i.e locales["en"]

  const elementsForTranslation = document.querySelectorAll("[data-i18n]");

  elementsForTranslation.forEach((element) => {
    const key = element.getAttribute("data-i18n"); // i.e "paragraph"

    element.innerText = localeMessages[key]; // i.e "lorem ips"
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const page = AppPageHero();

  document.body.append(page);

  const button = document.createElement("button");
  button.innerText = "Change locale";
  document.body.prepend(button);

  translateAllTextOnPage();

  button.addEventListener("click", changeLocale);
});
