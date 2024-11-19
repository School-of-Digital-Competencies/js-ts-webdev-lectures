export function AppText(tag: "h2" | "h4" | "p", content: string | number): HTMLElement {
  const el = document.createElement(tag);

  el.innerHTML = content;

  return el;
}
