import { jd } from "../jd.config";

const defaultLinks = [
    {
        content: 'Track package',
        href: '/track',
        icon: 'Box'
    }
]

export function Header(data={}) {
    const { links=[...defaultLinks] } = data;

    if(localStorage.getItem('token')){
        links.push({
            content: 'Dashboard',
            href: '/dashboard/deliveries',
            icon: 'Table'
        })
    } else {
        links.push({
            content: 'Login',
            href: '/login',
            icon: 'User'
        })
    }

    return jd.header({ className: 'px-8 py-4 flex justify-between items-center bg-base-300 shadow-sm shadow-base-300' }, [
        jd.div({ className: 'flex justify-center items-center gap-4' }, [
        jd.button({ className: 'text-base-content hover:opacity-75 duration-150 lg:hidden', onclick: ()=>{document.querySelector('#drawer').checked=true} }, [jd.lucide('Menu', { size: 28 })]),
            jd.div({ className: 'text-2xl font-bold text-base-content' }, [
            jd.span({ className: 'text-primary'}, ["Q-"]),
            "Delivery"
        ])
        ]),
        jd.div({ className: 'flex gap-2' }, links.map(value=>{
            const { icon, href="", content="Link" } = value;

            return jd.a({ href: href, className: 'bg-transparent hover:bg-base-100 text-base-content px-3 py-2 duration-150 flex items-center gap-2' }, [icon?jd.lucide(icon, { size: 24, className: 'font-black' }):null, jd.p({ className: 'opacity-75' }, [content])])
        }))
    ])    
}