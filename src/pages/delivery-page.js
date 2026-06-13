import { createSignal } from "@just-dom/signals";
import { VITE_API_URL } from "../env";
import { jd } from "../jd.config";
import { DeliveryForm } from "../forms/delivery-form";

export function DeliveryPage(params) {
    return jd.div({ className: 'h-full flex flex-col p-8' }, [
        DeliveryForm()
    ])
}