import "./style.css";
import Router from "pathparser";
import { homePage } from "./pages/home";
import { artistPage } from "./pages/artist";

// Query app element
const appElement = document.getElementById("app");

// Initialize router
const router = new Router();

// Add routes
router.add("/artist/:artistId", artistPage(appElement));
router.add("", homePage(appElement));

// Run router with location path
router.run(window.location.pathname + window.location.search);
