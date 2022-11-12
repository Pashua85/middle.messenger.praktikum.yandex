import { renderPage } from "./renderPage";

export const listenNavigateEvents = () => {
  const toSignInLink = document.querySelector(".sign-up-form__link");
  const toSignUpLink = document.querySelector(".sign-in-form__link");
  const toViewProfileButton = document.querySelector("#save-profile");
  const toEditPasswordLink = document.querySelector(".profile__link_password");
  const toEditProfileLink = document.querySelector(".profile__link_data");

  toSignInLink?.addEventListener("click", (e) => {
    e.preventDefault();
    renderPage("signIn");
  });

  toSignUpLink?.addEventListener("click", (e) => {
    e.preventDefault();
    renderPage("signUp");
  });

  toViewProfileButton?.addEventListener("click", (e) => {
    e.preventDefault();
    renderPage("profile", { name: "Иван", isInViewMode: true });
  });

  toEditPasswordLink?.addEventListener("click", (e) => {
    e.preventDefault();
    renderPage("profile", { name: "Иван", editPassword: true });
  });

  toEditProfileLink?.addEventListener("click", (e) => {
    e.preventDefault();
    renderPage("profile", { name: "Иван" });
  });
};
