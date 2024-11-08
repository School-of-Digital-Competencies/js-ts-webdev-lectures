import router from "../router";
import { TPost } from "../types";

export function Post(post: TPost): HTMLElement {
  const article = document.createElement("article");

  article.className = "box content";

  const title = document.createElement("h4");
  title.innerText = post.title;

  const description = document.createElement("p");
  description.innerText = post.body;

  const button = document.createElement("a");
  button.innerText = "Read more";
  button.className = "button";

  button.addEventListener("click", () => {
    router.navigate(`/posts/${post.id}`);
  });

  article.append(...[title, description, button]);

  return article;
}
