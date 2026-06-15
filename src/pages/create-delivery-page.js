import { createSignal } from "@just-dom/signals";
import { VITE_API_URL } from "../env";
import { jd } from "../jd.config";
import { DeliveryForm } from "../forms/delivery-form";

export function CreateDeliveryPage(params) {
    return jd.div({ className: 'h-full flex flex-col p-8' }, [
        DeliveryForm({
            onsubmit: e => {
                e.preventDefault();

                const data = new FormData(e.target);
                const obj = Object.fromEntries(data);

                fetch(`${VITE_API_URL}/delivery`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(obj)
                }).then(async res => {
                    const json = await res.json();

                    if(!res.ok) {
                        return alert(json.error | 'Unknown error');
                    }

                    document.location.href = `/dashboard/delivery/${json.id}`;
                })
            }
        })
    ])
}