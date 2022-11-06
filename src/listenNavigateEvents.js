import { renderOtherPage } from "./renderOtherPage";
import { renderMainPage } from "./renderMainPage";

export const listenNavigateEvents = () => {
  const someButton = document.querySelector("#some-button");
  const otherButton = document.querySelector("#other-button");

  someButton?.addEventListener("click", () => {
    renderOtherPage();
  });

  otherButton?.addEventListener("click", () => {
    renderMainPage();
  });
};
