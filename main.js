class Heading {
  #node;

  constructor(tag = "h1", content) {
    this.#node = document.createElement(tag);

    this.#node.textContent = content;
  }

  get node() {
    return this.#node;
  }
}

class Card {
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

function Grid() {
  this.node = document.createElement("ul");

  this.node.setAttribute("class", "grid");
}

function Page(props) {
  const node = document.createElement("section");

  const h1 = new Heading("h1", "Our Happy Clients");
  const grid = new Grid();
  const cards = props.map((content) => new Card(content));

  node.append(h1.node);

  node.append(grid.node);

  cards.forEach((card) => {
    node.append(card.node);
  });

  return node;
}

function renderPage(data) {
  const page = Page(data);

  document.body.append(page);
}

function loadData() {
  return [
    {
      content:
        "Get a fully retina ready site when you build with Startup Framework. Websites look sharper and more gorgeous on devices with retina display support",
      name: "Rayhan Curran",
      img: {
        src: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png",
      },
      _color: "red",
    },

    {
      content:
        "As a business targeting high net worth individuals, we were looking for a slick, cool and mini-malistic design for our website",
      name: "Kayley Frame",
      img: {
        src: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_2.png",
      },
    },
  ];
}

function initApp() {
  const data = loadData();

  renderPage(data);
}

document.addEventListener("DOMContentLoaded", () => {
  // start to build our page
  initApp();
});
