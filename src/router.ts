import Navigo from "navigo";
import { PostsPage } from "./pages/PostsPage";
import { PostPage } from "./pages/PostPage";

const router = new Navigo("/");

function handleRouteChange(
  handler: (params?: unknown) => Promise<HTMLElement>,
  params?: unknown
) {
  const app = document.getElementById("app");

  if (app) {
    console.log("handleRouteChange start rendering new page inside", app);

    app.innerHTML = "Loading... Loading... Loading...";

    handler(params).then((page) => {
      console.log("handleRouteChange page", page);

      app.innerHTML = "";
      app.append(page);
    });
  }
}

router
  .on({
    "/posts": () => {
      console.log("catch /posts page");

      return handleRouteChange(PostsPage);
    },

    "/tasks": () => {
      console.log("catch tasks url change");

      return handleRouteChange(PostsPage);
    },

    "/posts/:postId": (params: { data: { postId: string } }) =>
      handleRouteChange(PostPage, params),
  })
  .resolve();

export default router;
