import otherPageTemplate from "./pages/otherPage.hbs";
import { listenNavigateEvents } from "./listenNavigateEvents";

export const renderOtherPage = () => {
  const html = otherPageTemplate({ username: "Max Factor" });
  const root = document.querySelector("#app");

  root.innerHTML = html;

  listenNavigateEvents();
};
