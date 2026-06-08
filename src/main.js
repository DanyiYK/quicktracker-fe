import "./style.css";
import { defineRoutes } from "@just-dom/router";
import { createRoot } from "just-dom";
import { jd } from "./jd.config.js";
import { NotFound } from "./pages/not-found-page.js";
import { BaseLayout } from "./layouts/base-layout.js";
import { LoginForm } from "./pages/login-page.js";

const routes = defineRoutes([
  { path: '/login', element: ()=>{return BaseLayout({ content: LoginForm() })} },
  { path: '*', element: ()=>{ return BaseLayout({ content: NotFound() }) } }
])

createRoot(
  "app",
  jd.router(routes)
);