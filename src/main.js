import "./style.css";
import { defineRoutes } from "@just-dom/router";
import { createRoot } from "just-dom";
import { jd } from "./jd.config.js";
import { NotFoundPage } from "./pages/not-found-page.js";
import { BaseLayout } from "./layouts/base-layout.js";
import { LoginPage } from "./pages/login-page.js";
import { DashboardLayout } from "./layouts/dashboard-layout.js";

const routes = defineRoutes([
    { path: '/login', element: () => { return BaseLayout({ content: LoginPage() }) } },
    {
        path: '/dashboard/:section', element: () => {
            return DashboardLayout({
                options: [
                    {
                        text: 'Deliveries',
                        icon: 'Box',
                        href: '/dashboard/deliveries'
                    },
                    {
                        text: 'Couriers',
                        icon: 'Truck',
                        href: '/dashboard/couriers'
                    },
                    {
                        text: 'Statistics',
                        icon: 'GitGraph',
                        href: '/dashboard/statistics'
                    },
                ]
            })
        }
    },
    { path: '*', element: () => { return BaseLayout({ content: NotFoundPage() }) } }
]);

createRoot(
    "app",
    jd.router(routes)
);