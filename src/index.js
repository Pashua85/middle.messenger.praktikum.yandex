import mainPageTemplate from "./pages/mainPage.hbs";
import "./registerPartials";

const appDiv = document.querySelector("#app");

if (appDiv) {
  const html = mainPageTemplate({ username: "Peter Green" });

  appDiv.innerHTML = html;
}
