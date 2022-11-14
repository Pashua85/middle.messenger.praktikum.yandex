import Handlebars from "handlebars/dist/handlebars.runtime";
import formInput from "./partials/formInput/formInput.hbs";
import customButton from "./partials/customButton/customButton.hbs";
import rowInput from "./partials/rowInput/rowInput.hbs";

export const registerPartials = () => {
  Handlebars.registerPartial("formInput", formInput);
  Handlebars.registerPartial("customButton", customButton);
  Handlebars.registerPartial("rowInput", rowInput);
};
