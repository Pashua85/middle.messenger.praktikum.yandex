import Handlebars from "handlebars/dist/handlebars.runtime";
import someButton from "./partials/someButton/someButton.hbs";
import outerPartial from "./partials/outerPartial/outerPartial.hbs";
import formInput from "./partials/formInput/formInput.hbs";
import customButton from "./partials/customButton/customButton.hbs";

export const registerPartials = () => {
  Handlebars.registerPartial("someButton", someButton);
  Handlebars.registerPartial("outerPartial", outerPartial);
  Handlebars.registerPartial("formInput", formInput);
  Handlebars.registerPartial("customButton", customButton);
};
