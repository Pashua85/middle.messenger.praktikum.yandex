import { renderPage } from "./renderPage";

export const listenNavigateEvents = () => {
  const someButton = document.querySelector("#some-button");
  const otherButton = document.querySelector("#other-button");

  console.log({ someButton, otherButton });

  someButton?.addEventListener("click", () => {
    renderPage("other", { username: "Max Fry" });
  });

  otherButton?.addEventListener("click", () => {
    renderPage("main", { username: "Max Payne" });
  });
};
