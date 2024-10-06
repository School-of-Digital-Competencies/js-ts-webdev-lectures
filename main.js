document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  initApp(app);
});

function getData() {
  return [
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
}

function onClick(event) {
  console.log("clicked", this, event);
}

function Client(props) {
  const { img, content, name } = props;

  const cardNode = document.createElement("article");

  const imgNode = document.createElement("img");
  imgNode.setAttribute("src", img.src);

  const contentNode = document.createElement("p");
  contentNode.textContent = content;

  const nameNode = document.createElement("h4");
  nameNode.textContent = name;

  cardNode.append(imgNode);
  cardNode.append(contentNode);
  cardNode.append(nameNode);

  return cardNode;
}

function Clients(data) {
  const sectionNode = document.createElement("section");
  const cards = data.map((client) => Client(client));

  sectionNode.append(...cards);

  return sectionNode;
}

function Page(data) {
  const mainNode = document.createElement("main");

  const h1Node = document.createElement("h1");
  h1Node.textContent = "Our Happy Clients";

  const clients = Clients(data);

  mainNode.append(h1Node);
  mainNode.append(clients);

  return mainNode;
}

function initApp(app) {
  const data = getData();

  const page = Page(data);

  app.append(page);
}
