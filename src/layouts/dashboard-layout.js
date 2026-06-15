import { Header } from '../components/header';
import { VITE_API_URL } from '../env';
import { jd } from '../jd.config';
import { CourierPage } from '../pages/courier-page';
import { CouriersPage } from '../pages/couriers-page';
import { CreateCourierPage } from '../pages/create-courier-page';
import { CreateDeliveryPage } from '../pages/create-delivery-page';
import { DeliveriesPage } from '../pages/deliveries-page';
import { DeliveryPage } from '../pages/delivery-page';

const RegisteredSections = [
    {
        name: 'courier',
        element: CreateCourierPage,
        requires_id: false // Whether the id param should be specified
    },
    {
        name: 'courier',
        element: CourierPage,
        requires_id: true
    },
    {
        name: 'couriers',
        element: CouriersPage,
        requires_id: false
    },
    {
        name: 'delivery',
        element: CreateDeliveryPage,
        requires_id: false
    },
    {
        name: 'delivery',
        element: DeliveryPage,
        requires_id: true
    },
    {
        name: 'deliveries',
        element: DeliveriesPage,
        requires_id: false
    }
]

const NotFoundSection = {
    name: 'notfound',
    element: ()=>{return '404 - Section not found :('},
    requires_id: false
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
    checkAuth();

    const selectedSection = getSection(params);

    return jd.fragment([
        Header({
            useDrawerButton: true
        }),
        jd.div({ className: 'drawer lg:drawer-open' }, [
            jd.input({ id: 'drawer', type: 'checkbox', className: 'drawer-toggle hidden' }),
            jd.div({ className: 'drawer-content pt-18' }, [
                selectedSection.element(params)
            ]),
            jd.div({ className: 'drawer-side pt-18' }, [
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

function getSection(params) {
    const { section, id } = params;
    const hasId = Boolean(id);

    for(const value of RegisteredSections) {
        if(value.name===section && value.requires_id===hasId) {
            return value;
        }
    }

    return NotFoundSection;
}