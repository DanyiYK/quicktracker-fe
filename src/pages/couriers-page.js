import { createSignal, when } from "@just-dom/signals";
import { jd } from "../jd.config";
import { navigate } from "@just-dom/router";
import { VITE_API_URL } from "../env";

export function CouriersPage() {
    return jd.div({ className: 'flex justify-center items-center h-full' }, ["Courier page"])
}