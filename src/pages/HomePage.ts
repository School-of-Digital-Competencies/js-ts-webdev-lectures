import { fakeLoadPosts } from "../api/postsApi";
import { Post } from "../components/Post";
import { TPost } from "../types";

export function HomePage() {
  const main = document.createElement("main");
  main.className = "grid";

  main.innerHTML = "Loading...";

  return fakeLoadPosts().then((posts: TPost[]) => {
    console.log("HomePage loadPosts success", posts);

    main.innerHTML = "";

    posts.forEach((post) => {
      const postElement = Post(post);

      const container = document.createElement("div");
      container.className = "cell";

      container.append(postElement);
      main.append(container);
    });

    return main;
  });
}
