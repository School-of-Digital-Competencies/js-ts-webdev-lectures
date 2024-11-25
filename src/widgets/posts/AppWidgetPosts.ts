import { productApi } from "../../entities";

export async function AppWidgetPosts() {
  const element = document.createElement("article");

  try {
    const posts = await productApi.loadPosts();

    console.log(posts);

    element.innerHTML = JSON.stringify(posts);
  } catch (err) {
    console.error(err);
  } finally {
    return element;
  }
}
