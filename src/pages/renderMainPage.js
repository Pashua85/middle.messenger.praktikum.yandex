import Handlebars from "handlebars";

const template = `
  <div id="main-page">
    Hello, {{ username }}.
    It's HDS file
  </div>
`;

export const renderMainPage = () => {
  const compiled = Handlebars.compile(template);
  const html = compiled({ username: "Max Payne" });
  const root = document.querySelector("#app");

  root.innerHTML = html;
};
