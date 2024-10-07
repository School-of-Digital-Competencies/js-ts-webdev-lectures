function Heading(tag = "h1", content) {
  const node = document.createElement(tag);

  node.textContent = content;

  return node;
}

function Card(props) {
  const node = document.createElement("li");

  node.classList.add("card");
  if (props._color && props._color === "red") {
    node.classList.add("card--red");
  }

  const img = document.createElement("img");
  img.setAttribute("src", props.img.src);

  const heading = Heading("h6", props.name);

  const paragraph = document.createElement("p");
  paragraph.textContent = props.content;

  node.append(img);
  node.append(paragraph);
  node.append(heading);

  return node;
}

function Grid() {
  const node = document.createElement("ul");

  node.setAttribute("class", "grid");

  return node;
}

function Page(props) {
  const node = document.createElement("section");

  const h1 = Heading("h1", "Our Happy Clients");
  const grid = Grid();
  const cards = props.map((content) => Card(content));

  node.append(h1);

  node.append(grid);

  node.append(...cards);

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
