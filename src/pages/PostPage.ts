import { fakeLoadPostById } from "../api/postsApi";
import { Post } from "../components/Post";

export function PostPage(params) {
  const {
    data: { postId },
  } = params;
  const main = document.createElement("main");

  main.innerHTML = "...Loading";

  return fakeLoadPostById(postId).then((post) => {
    main.innerHTML = "";

    const postElement = Post(post);

    const container = document.createElement("div");
    container.className = "container";

    container.append(postElement);
    main.append(container);

    return main;
  });
}
