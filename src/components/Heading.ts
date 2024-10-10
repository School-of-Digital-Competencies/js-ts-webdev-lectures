export class Heading {
  #node;

  constructor(tag = "h1", content) {
    this.#node = document.createElement(tag);

    this.#node.textContent = content;
  }

  get node() {
    return this.#node;
  }
}
