import { Heading } from "./Heading";

export default class Card {
  #node;

  constructor(props) {
    this.#node = document.createElement("li");
    this.#renderContent(props);
  }

  #renderContent(props) {
    this.#node.classList.add("card");
    if (props._color && props._color === "red") {
      console.log("aaa", this.#node, this.#node.classList);
      this.#node.classList.add("card--red");
    }

    this.#renderImage(props);
    this.#renderParagraph(props);
    this.#renderHeading(props);
  }

  #renderImage(props) {
    const img = document.createElement("img");
    img.setAttribute("src", props.img.src);
    this.#node.append(img);
  }

  #renderHeading(props) {
    const heading = new Heading("h6", props.name);
    this.#node.append(heading.node);
  }

  #renderParagraph(props) {
    const paragraph = document.createElement("p");
    paragraph.textContent = props.content;
    this.#node.append(paragraph);
  }

  get node() {
    return this.#node;
  }
}
