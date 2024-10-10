import { Heading as Hfgsdfgds } from "./Heading";
import CardGdsfsdf from "./Card";
import { Grid } from "./Grid";

/**
 *
 * @param {Array<{ content }>} props
 * @returns HTMLElement
 */
export function Page(props) {
  const node = document.createElement("section");

  const h1 = new Hfgsdfgds("h1", "Our Happy Clients");
  const grid = new Grid();
  const cards = props.map((content) => new CardGdsfsdf(content));

  node.append(h1.node);

  node.append(grid.node);

  cards.forEach((card) => {
    node.append(card.node);
  });

  return node;
}
