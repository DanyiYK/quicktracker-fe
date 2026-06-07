import "./style.css";
import { defineRoutes } from "@just-dom/router";
import { createRoot } from "just-dom";
import { jd } from "./jd.config.js";


const routes = defineRoutes([
  { path: '/login', element: ()=>{return document.createTextNode("Login page")} },
  { path: '', element: ()=>{return document.createTextNode("Not found")} }
])

createRoot(
  "app",
  jd.router(routes)
);