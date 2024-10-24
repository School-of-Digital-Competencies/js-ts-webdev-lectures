import { AppButton } from "../components/button/AppButton";
import { AppHeader } from "../components/header/AppHeader";
import "./AppPageHero.css";

export function AppPageHero() {
  const node = document.createElement("section");

  node.classList.add("hero");

  const header = AppHeader();
  const button = AppButton("Explore Design");

  // @ts-ignore
  const imgUrl = new URL("../assets/Rectangle.jpg", import.meta.url).href;

  node.innerHTML = `
    <article class="container container--horizontal">

        <div class="container">
            <h1 data-i18n="title"></h1>

            <p data-i18n="paragraph"></p>

        </div>
        
        <img src=${imgUrl}>
    </article>
`;

  const container = node.querySelector("div.container");
  container?.append(button);

  node.prepend(header);

  return node;
}
