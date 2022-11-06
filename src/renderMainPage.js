import mainPageTemplate from "./pages/mainPage.hbs";
import { listenNavigateEvents } from "./listenNavigateEvents";

export const renderMainPage = () => {
  const html = mainPageTemplate({ username: "Max Payne" });
  const root = document.querySelector("#app");

  root.innerHTML = html;

  listenNavigateEvents();
};
