import { renderMainPage } from "./renderMainPage";
import { registerPartials } from "./registerPartials";

registerPartials();

renderMainPage();

console.log("from index js");
