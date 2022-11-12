import { renderPage } from "./renderPage";
import { registerPartials } from "./registerPartials";
import imgUrl from "./assets/photo-placeholder.png";
import "./styles";

registerPartials();

renderPage("profile", { name: "Иван", editPassword: true });
