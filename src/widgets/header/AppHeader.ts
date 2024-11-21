export type AppHeaderProps = {
  logo?: "string";
};

export function AppHeader(props?: AppHeaderProps) {
  const element = document.createElement("header");

  element.setAttribute("class", "bulma-box");

  if (props?.logo) {
    element.innerText = props?.logo;
  } else {
    element.innerText = "Bloom Beauty";
  }

  return element;
}
