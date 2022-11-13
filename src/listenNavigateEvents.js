import { renderPage } from "./renderPage";

export const listenNavigateEvents = () => {
  const toSignInLink = document.querySelector(".sign-up-form__link");
  const toSignUpLink = document.querySelector(".sign-in-form__link");
  const toViewProfileButton = document.querySelector("#save-profile");
  const toEditPasswordLink = document.querySelector(".profile__link_password");
  const toEditProfileLink = document.querySelector(".profile__link_data");
  const toSignInFromProfileLink = document.querySelector(".profile__link_exit");
  const toProfileLink = document.querySelector(".sidebar__link");
  const toChatsButton = document.querySelector(".profile__back");
  const toChatsFromSignInButton = document.querySelector("#sing-in-button");
  const toChatsFormSingUpButton = document.querySelector("#sing-up-button");
  const backToChatsLink = document.querySelector(".error-page__link");

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

  toProfileLink?.addEventListener("click", (e) => {
    e.preventDefault();
    renderPage("profile", { name: "Иван", isInViewMode: true });
  });

  toChatsButton?.addEventListener("click", () => {
    renderPage("chats");
  });

  toChatsFromSignInButton?.addEventListener("click", () => {
    renderPage("chats");
  });

  toChatsFormSingUpButton?.addEventListener("click", () => {
    renderPage("chats");
  });

  toSignInFromProfileLink?.addEventListener("click", (e) => {
    e.preventDefault();
    renderPage("signIn");
  });

  backToChatsLink?.addEventListener("click", (e) => {
    e.preventDefault();
    renderPage("chats");
  });
};
