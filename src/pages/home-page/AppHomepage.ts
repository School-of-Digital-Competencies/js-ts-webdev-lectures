import { AppHeader, AppWidgetProductCatalog } from "../../widgets";

export async function AppHomepage() {
  const element = document.createElement("main");

  try {
    const header = AppHeader();
    const widgetProductCatalog = await AppWidgetProductCatalog({
      title: "New products",
      type: "new",
    });
    const widgetPopularProductCatalog = await AppWidgetProductCatalog({
      title: "Popular products",
      type: "popular",
    });

    element.append(
      ...[header, widgetProductCatalog, widgetPopularProductCatalog]
    );
  } catch (err) {
    element.innerHTML = `<h1>Some error</h1> <pre>${JSON.stringify(err)}</pre>`;
  } finally {
    return element;
  }
}
