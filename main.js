function Heading(tag = "h1", content) {
  const node = document.createElement(tag);

  node.textContent = content;

  return node;
}

function Card(props) {
  const node = document.createElement("li");

  node.setAttribute("class", "card");

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

document.addEventListener("DOMContentLoaded", () => {
  // start to build our page
  const h1 = Heading("h1", "Our Happy Clients");

  document.body.append(h1);

  const grid = Grid();

  document.body.append(grid);

  const data = [
    {
      content:
        "Get a fully retina ready site when you build with Startup Framework. Websites look sharper and more gorgeous on devices with retina display support",
      name: "Rayhan Curran",
      img: {
        src: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png",
      },
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

  const cards = data.map((content) => Card(content));

  document.body.append(...cards);
});
