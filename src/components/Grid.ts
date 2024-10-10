export class Grid {
  #node;

  constructor() {
    this.#node = document.createElement("ul");

    this.#node.setAttribute("class", "grid");
  }

  get node() {
    return this.#node;
  }
}
