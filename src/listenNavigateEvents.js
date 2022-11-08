import { renderPage } from "./renderPage";

export const listenNavigateEvents = () => {
  const toSignInLink = document.querySelector(".sign-up-form__link");
  const toSignUpLink = document.querySelector(".sign-in-form__link");

  toSignInLink?.addEventListener("click", (e) => {
    e.preventDefault();
    renderPage("signIn");
  });

  toSignUpLink?.addEventListener("click", (e) => {
    e.preventDefault();
    renderPage("signUp");
  });
};
