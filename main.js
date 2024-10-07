function Heading(tag = "h1", content) {
  this.node = document.createElement(tag);

  this.node.textContent = content;
}

function Card(props) {
  this.node = document.createElement("li");

  this.node.classList.add("card");
  if (props._color && props._color === "red") {
    this.node.classList.add("card--red");
  }

  const img = document.createElement("img");
  img.setAttribute("src", props.img.src);

  const heading = new Heading("h6", props.name);

  const paragraph = document.createElement("p");
  paragraph.textContent = props.content;

  this.node.append(img);
  this.node.append(paragraph);
  this.node.append(heading.node);
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

  cards.forEach((element) => {
    node.append(element.node);
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
