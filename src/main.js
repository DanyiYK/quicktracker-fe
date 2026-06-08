import "./style.css";
import { defineRoutes } from "@just-dom/router";
import { createRoot } from "just-dom";
import { jd } from "./jd.config.js";
import { NotFound as NotFoundPage } from "./pages/not-found-page.js";
import { BaseLayout } from "./layouts/base-layout.js";
import { LoginPage } from "./pages/login-page.js";
import { DashboardPage } from "./pages/dashboard-page.js";

const routes = defineRoutes([
  { path: '/login', element: ()=>{return BaseLayout({ content: LoginPage() })} },
  { path: '*', element: ()=>{ return BaseLayout({ content: NotFoundPage() }) } }
])

createRoot(
  "app",
  jd.router(routes)
);