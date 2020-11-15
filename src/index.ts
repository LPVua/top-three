import "./style.css";
import Router from "pathparser";
import { homePage } from "./pages/home";
import { artistPage } from "./pages/artist";
const appElement = document.getElementById("app");

const router = new Router();

router.add("/artist/:artistId", artistPage(appElement));
router.add("", homePage(appElement));

router.run(window.location.pathname + window.location.search);
