import { fakeLoadPosts } from "../api/postsApi";
import { Post } from "../components/Post";
import { TPost } from "../types";

export function PostsPage() {
  const main = document.createElement("main");
  main.className = "container";

  return fakeLoadPosts().then((posts: TPost[]) => {
    console.log("PostsPage loadPosts success", posts);

    main.innerHTML = "";

    const columns = document.createElement("div");
    columns.className = "columns is-multiline";

    posts.forEach((post) => {
      const postElement = Post(post);

      const column = document.createElement("div");
      column.className = "column is-12-mobile is-6-tablet is-4-desktop";

      column.append(postElement);
      columns.append(column);
    });

    main.append(columns);
    return main;
  });
}
