import { createSignal, effect, when } from "@just-dom/signals";
import { jd } from "../jd.config";
import { navigate } from "@just-dom/router";
import { VITE_API_URL } from "../env";

export function CouriersPage() {

    const [checks, setChecks] = createSignal(0);
    const [courierList, setCourierList] = createSignal([]);
    const [searchParam, setSearchParam] = createSignal('');

    fetch(`${VITE_API_URL}/couriers/`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    }).then(async res => {
        const json = await res.json();

        setCourierList(json),
            console.log(json)
    })

    return jd.div({ className: 'flex h-full w-full flex-col p-8 gap-6' }, [
        jd.h2({ className: 'text-2xl font-bold' }, ["Courier list"]),
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
                        placeholder: "Search courier",
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
            jd.a({ className: 'btn btn-block duration-150 hover:btn-primary text-xl size-8', href: '/dashboard/courier' }, ['+'])
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
                        jd.th({}, [" Name"]),
                        jd.th({}, [" Phone number"]),
                        jd.th({}, [" Email"]),
                        jd.th({}),
                    ]),
                ]),
                jd.tbody({
                    ref: el => {
                        effect(el, () => {
                            console.log(el)
                            el.innerHTML = '';

                            const param = searchParam();
                            const couriers = courierList();

                            couriers.forEach(value => {
                                if (!`${value.name} ${value.surname}`.toLowerCase().includes(param.toLowerCase())) { return }
                                el.appendChild(CourierRow(value, courierList, setCourierList));
                            })
                        })
                    }
                }),
                jd.tfoot({}, [
                    jd.tr({}, [
                        jd.th({}),
                        jd.th({}, [" Name"]),
                        jd.th({}, [" Phone number"]),
                        jd.th({}, [" Email"]),
                        jd.th({}),
                    ]),
                ]),
            ]),
        ])
    ])
}

function CourierRow(courier, courierList, setCourierList) {
    const { id, name, surname, email, phone_number, fiscal_code } = courier;

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
                jd.div({ className: 'font-bold' }, [`${name} ${surname}`]),
                jd.div({ className: 'text-sm opacity-50' }, [fiscal_code]),
            ])
        ]),
        jd.td({}, [phone_number]),
        jd.td({}, [email]),
        jd.td({}, [
            jd.a({ className: 'btn btn-ghost btn-xs', href: `/dashboard/courier/${id}/` }, ['Edit']),
            jd.button({
                className: 'btn btn-ghost btn-xs',
                onclick: (e) => {
                    fetch(`${VITE_API_URL}/courier/${id}/`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    }).then(res => {
                        if (res.ok) {
                            setCourierList(courierList().filter(value => { if (value == courier) { return false } return courier }))
                        }
                    })
                }
            }, ['Delete']),
        ]),
    ])
}