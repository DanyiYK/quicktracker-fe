import { createSignal, effect, when } from "@just-dom/signals";
import { jd } from "../jd.config";
import { navigate } from "@just-dom/router";
import { VITE_API_URL } from "../env";

export function DeliveriesPage() {

    const [checks, setChecks] = createSignal(0);
    const [deliveryList, setDeliveryList] = createSignal([]);
    const [searchParam, setSearchParam] = createSignal('');

    fetch(`${VITE_API_URL}/deliveries/`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    }).then(async res => {
        const json = await res.json();

        setDeliveryList(json)
    })

    return jd.div({ className: 'flex h-full w-full flex-col p-8 gap-6' }, [
        jd.h2({ className: 'text-2xl font-bold' }, ["Deliveries"]),
        jd.div({ className: 'flex gap-2 items-center' }, [
            jd.div({ className: 'flex justify-between gap-2' }, [
                jd.label({ className: "input" }, [
                    jd.svg(
                        {
                            class: "h-[1em] opacity-50",
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 24 24",
                        },
                        [
                            jd.svgG(
                                {
                                    "stroke-linejoin": "round",
                                    "stroke-linecap": "round",
                                    "stroke-width": "2.5",
                                    fill: "none",
                                    stroke: "currentColor",
                                },
                                [
                                    jd.svgCircle({ cx: "11", cy: "11", r: "8" }),
                                    jd.svgPath({ d: "m21 21-4.3-4.3" }),
                                ]
                            ),
                        ]
                    ),
                    jd.input({
                        type: "search",
                        className: "grow",
                        placeholder: "Search delivery",
                        ref: (el) => {
                            document.addEventListener('keydown', e => {
                                if (e.ctrlKey && e.key.toLowerCase() == 'k') {
                                    e.preventDefault();
                                    el.focus();
                                }
                            })
                        },
                        oninput: (e) => {
                            setSearchParam(e.target.value);
                        }
                    }),
                    jd.kbd({ className: "kbd kbd-sm" }, [" CTRL"]),
                    jd.kbd({ className: "kbd kbd-sm" }, [" K"]),
                ]),
            ]),
            jd.a({ className: 'btn btn-block duration-150 hover:btn-primary text-xl size-8', href: '/dashboard/delivery' }, ['+'])
        ]),
        jd.div({ className: "overflow-x-auto" }, [
            jd.table({ className: "table" }, [
                jd.thead({}, [
                    jd.tr({}, [
                        jd.th({}, [
                            jd.label({}, [jd.input({
                                type: "checkbox",
                                className: "checkbox",
                                ref: (el) => {
                                },
                            })]),
                        ]),
                        jd.th({}, [" Tracking Code"]),
                        jd.th({}, [" Courier"]),
                        jd.th({}, [" Closed"]),
                        jd.th({}, [" Creation date"]),
                        jd.th({}),
                    ]),
                ]),
                jd.tbody({
                    ref: el => {
                        effect(el, () => {
                            console.log(el)
                            el.innerHTML = '';

                            const param = searchParam();
                            const couriers = deliveryList();

                            couriers.forEach(value => {
                                if (!value.tracking_code.toLowerCase().includes(param.toLowerCase())) { return }
                                el.appendChild(DeliveryRow(value, deliveryList, setDeliveryList));
                            })
                        })
                    }
                }),
                jd.tfoot({}, [
                    jd.tr({}, [
                        jd.th({}, [" Tracking Code"]),
                        jd.th({}, [" Courier"]),
                        jd.th({}, [" Closed"]),
                        jd.th({}, [" Creation date"]),
                        jd.th({}),
                    ]),
                ]),
            ]),
        ])
    ])
}

function DeliveryRow(delivery, courierList, setCourierList) {
    const { tracking_code, courier, creation_date, is_closed } = delivery;

    return jd.tr({}, [
        jd.td({}, [
            jd.label({}, [
                jd.input({ type: 'checkbox', className: 'checkbox' })
            ])
        ]
        ),
        jd.td({}, [
            jd.div({
                className: 'flex flex-col gap-0.5'
            }, [
                jd.div({ className: 'font-bold' }, [`${tracking_code}`]),
                //jd.div({ className: 'text-sm opacity-50' }, [fiscal_code]),
            ])
        ]),
        jd.td({}, [jd.a({ href:`/dashboard/courier/${courier.id}`, className:'text-accent' }, [courier.name])]),
        jd.td({ className: is_closed?'text-error':'text-success' }, [is_closed?'Closed':'Open']),
        jd.td({}, [new Date(creation_date).toLocaleString()]),
        jd.td({}, [
            jd.a({ className: 'btn btn-ghost btn-xs', href: `/dashboard/delivery/${courier.id}/` }, ['Edit']),
            jd.button({
                className: 'btn btn-ghost btn-xs',
                onclick: (e) => {
                    fetch(`${VITE_API_URL}/delivery/${courier.id}/`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    }).then(res => {
                        if (res.ok) {
                            setDeliveryList(deliveryList().filter(value => { if (value == delivery) { return false } return delivery }))
                        }
                    })
                }
            }, ['Delete']),
        ]),
    ])
}