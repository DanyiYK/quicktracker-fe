import { Header } from "../components/header";
import { jd } from "../jd.config";

export function DashboardLayout(props) {
    const { headerData = {}, content = jd.fragment(), options = [] } = props;

    return jd.fragment([
        Header(headerData),
        jd.div({ className: "drawer lg:drawer-open" }, [
            jd.input({ id: "drawer", type: "checkbox", className: "drawer-toggle hidden" }),
            jd.div({ className: "drawer-side" }, [
                jd.label({
                    htmlFor: "drawer",
                    ariaLabel: "close sidebar",
                    className: "drawer-overlay",
                }),
                jd.ul({ className: "menu bg-base-200 min-h-full w-64 p-4" }, options.map(value => {
                    const { text = '', href = '#', icon = 'FileQuestion' } = value;

                    return jd.li({}, [jd.a({ href: href, className: `w-full mb-1 px-0 ${document.location.pathname.startsWith(href)?'bg-primary text-primary-content':''}` }, [jd.lucide(icon, { size: 22, className: 'ml-2' }), text])])
                })),
            ]),
        ])
    ]);
}