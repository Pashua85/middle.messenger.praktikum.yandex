import mainPageTemplate from "./pages/mainPage/mainPage.hbs";
import otherPageTemplate from "./pages/otherPage/otherPage.hbs";
import signUpTemplate from "./pages/signUpPage/signUpPage.hbs";
import { listenNavigateEvents } from "./listenNavigateEvents";

const templates = {
  main: mainPageTemplate,
  other: otherPageTemplate,
  signUp: signUpTemplate,
};

export const renderPage = (page = "main", data = {}) => {
  const template = templates[page];

  if (template) {
    const html = template(data);
    const root = document.querySelector("#app");

    root.innerHTML = html;

    listenNavigateEvents();
  }
};
