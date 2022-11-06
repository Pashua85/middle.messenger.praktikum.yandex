import Handlebars from "handlebars/dist/handlebars.runtime";
import someButton from "./markup/partials/someButton.hbs";

export const registerPartials = () => {
  console.log("from register partials");
  Handlebars.registerPartial("someButton", someButton);
};
