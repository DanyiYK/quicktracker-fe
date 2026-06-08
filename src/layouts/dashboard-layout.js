import { navigate } from "@just-dom/router";
import { Header } from "../components/header";
import { VITE_API_URL } from "../env";
import { jd } from "../jd.config";

export function DashboardLayout(props) {
    const { headerData = {}, content = jd.fragment(), options = [] } = props;

    const token = localStorage.getItem('token');

    if(!token) {
        navigate('/login');
    } else {
        fetch(`${VITE_API_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res=>{
            if(res.ok){return}
            localStorage.removeItem('token');
            document.location.href = '/login';
        })
    }

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

                    return jd.li({}, [jd.a({ href: href, className: `w-full mb-1 px-0 ${document.location.pathname.startsWith(href) ? 'bg-primary text-primary-content' : ''}` }, [jd.lucide(icon, { size: 22, className: 'ml-2' }), text])])
                })),
            ]),
        ])
    ]);
}