import "./style.css";
import { defineRoutes } from "@just-dom/router";
import { createRoot } from "just-dom";
import { jd } from "./jd.config.js";
import { NotFound } from "./pages/not-found-page.js";
import { BaseLayout } from "./layout/base-layout.js";

const routes = defineRoutes([
  { path: '/login', element: ()=>{return document.createTextNode("Login page")} },
  { path: '*', element: ()=>{ return BaseLayout({ content: NotFound() }) } }
])

createRoot(
  "app",
  jd.router(routes)
);