import { CardData } from "../types";
import cards from "../db/cards.json";

export function loadData(): Promise<CardData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cards);
    }, 550);
  });
}
