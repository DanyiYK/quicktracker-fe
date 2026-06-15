import { createSignal, effect } from "@just-dom/signals";
import { jd } from "../jd.config";
import { VITE_API_URL } from "../env";

export function DeliveryPage(params) {
    const [ delivery, setDelivery ] = createSignal({})
    const [ nextStates, setNextStates] = createSignal([])

    fetch(`${VITE_API_URL}/delivery/${params.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(async res => {
        const json = await res.json();
        
        if(!res.ok){ return alert(json.error | 'Unknown error') }

        setDelivery(json);
        setNextStates(json.states[json.states.length-1].state.next_states);
    })

    return jd.div({ className: 'h-full flex flex-col p-8' }, [
        jd.h2({ className: 'text-2xl font-bold' }, ['Delivery']),
        jd.form({ className: 'w-full flex-col p-2' }, [
            jd.div({ className: 'flex flex-col gap-2 p-4 bg-base-300 w-lg'}, [
                jd.form({
                    className: 'flex gap-2 justify-center items-center',
                    onsubmit: e => {
                        e.preventDefault();

                        const data = Object.fromEntries(new FormData(e.target));

                        data.delivery_id = params.id;

                        fetch(`${VITE_API_URL}/history`, {
                            method: 'POST',
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                                "Content-Type": 'application/json'
                            },
                            body: JSON.stringify(data)
                        }).then(async res => {
                            const json = await res.json();

                            if(!res.ok) { return alert(json.error|'Unknown error') }
                            console.log(json);
                            delivery().states.push(json);
                            setNextStates(json.state.next_states);
                        })
                    }
                }, [
                    jd.select({
                        className: 'select',
                        name: 'state_id',
                        id: 'state_id',
                        ref: el => {
                            effect(el, ()=>{
                                el.innerHTML = '';

                                const next_states = nextStates();

                                next_states.forEach(value => {
                                    console.log(value)
                                    el.appendChild(jd.option({ value: value.id }, [value.display_name]))
                                })

                            })

                            el.after()
                        }
                    }),
                    jd.button({
                        className: 'btn duration-150 hover:btn-accent',
                        type: "submit"
                    }, ['Add'])
                ]),
                jd.div({
                    className: 'flex flex-col gap-1 bg-base-200 p-2',
                    ref: e => {
                        effect(e, ()=>{
                            const next = nextStates();
                            const { states=[] } = delivery();
                            
                            e.innerHTML = '';

                            states.forEach(value=>{
                                e.appendChild(jd.p({}, [value.display_name]))
                            })
                        })
                    }
                }, [

                ])
            ]),
        ])
    ])
}