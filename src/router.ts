import Navigo from "navigo";
import { HomePage } from "./pages/HomePage";
import { PostPage } from "./pages/PostPage";

const router = new Navigo("/");

function handleRouteChange(handler: () => Promise<void>, params?: unknown) {
  const app = document.getElementById("app");

  if (app) {
    console.log("handleRouteChange app", app);

    app.innerHTML = "";

    handler(params).then((page) => {
      console.log("handleRouteChange page", page);

      app.append(page);
    });
  }
}

router
  .on({
    "/posts": () => handleRouteChange(HomePage),

    "/posts/:postId": (params: { data: { postId: string } }) =>
      handleRouteChange(PostPage, params),
  })
  .resolve();

export default router;
