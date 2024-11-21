import Navigo from "navigo";
import { AppHomepage, AppProductPage } from "../pages";

const router = new Navigo("/");

function handleRouteChange(handler: () => Promise<void>, params?: unknown) {
  const app = document.getElementById("app");

  if (app) {
    console.log("handleRouteChange app", app);

    // display loading indicator
    app.innerHTML = "Loading...";

    handler(params).then((page) => {
      // remove displaing of loading indicator
      app.innerHTML = "";

      console.log("handleRouteChange done", page);

      app.append(page);
    });
  }
}

router
  .on({
    "/": () => handleRouteChange(AppHomepage),

    "/products/:productId": (params: { data: { productId: string } }) =>
      handleRouteChange(AppProductPage, params),
  })
  .resolve();

export default router;
