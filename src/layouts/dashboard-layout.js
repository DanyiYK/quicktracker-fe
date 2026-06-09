import { Header } from '../components/header';
import { VITE_API_URL } from '../env';
import { jd } from '../jd.config';
import { CourierPage } from '../pages/courier-page';

const RegisteredSections = {
    courier: {
        element: CourierPage,
        requires_id: false // Whether the id param should be specified
    },
    notfound: {
        element: ()=>{return '404 - Section not found :('},
        requires_id: false
    },
    invalid_data: {
        element: ()=>{return 'Invalid url format!'},
        requires_id: false
    },
}

const DashboardOptions = [
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

export function DashboardLayout({ params }) {
    const { section, id } = params;

    checkAuth();

    const selectedSection = RegisteredSections[section] || RegisteredSections['notfound'];

    if(!id && selectedSection.requiresId===true){
        selectedSection = RegisteredSections['invalid_data'];
    }

    return jd.fragment([
        Header({
            useDrawerButton: true
        }),
        jd.div({ className: 'drawer lg:drawer-open' }, [
            jd.input({ id: 'drawer', type: 'checkbox', className: 'drawer-toggle hidden' }),
            jd.div({ className: 'drawer-content' }, [
                selectedSection.element(params)
            ]),
            jd.div({ className: 'drawer-side' }, [
                jd.label({
                    htmlFor: 'drawer',
                    ariaLabel: 'close sidebar',
                    className: 'drawer-overlay',
                }),
                jd.ul({ className: 'menu bg-base-200 min-h-full w-64 p-4' }, DashboardOptions.map(value => {
                    const { text = '', href = '#', icon = 'FileQuestion' } = value;

                    return jd.li({ className: 'duration-75 hover:bg-base-300' }, [jd.a({ href: href, className: `w-full mb-1 px-0 ${document.location.pathname.startsWith(href) ? 'bg-primary text-primary-content' : 'bg-transparent'}` }, [jd.lucide(icon, { size: 22, className: 'ml-2' }), text])])
                })),
            ]),
        ])
    ]);
}

function checkAuth() {
    const token = localStorage.getItem('token');

    if(!token) {
        document.location.href = '/login';
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
}