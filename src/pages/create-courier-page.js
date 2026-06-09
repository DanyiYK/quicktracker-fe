import { createSignal } from "@just-dom/signals";
import { VITE_API_URL } from "../env";
import { CourierForm } from "../forms/CourierForm";
import { jd } from "../jd.config";

export function CourierPage() {
    const [ serverError, setServerError ] = createSignal('');
    const [ loading, setLoading ] = createSignal(false);

    return jd.div({ className: 'h-full flex flex-col items-center justify-center' }, [
        jd.div({ className: 'w-lg bg-base-200 px-4 py-2' }, [
            CourierForm({
                title: 'New courier',
                loadingSignal: loading,
                errorSignal: serverError,
                onsubmit: (e) => {
                    e.preventDefault();

                    const data = new FormData(e.target);
                    
                    setLoading(true);
                    fetch(`${VITE_API_URL}/courier/`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(Object.fromEntries(data))
                    }).then(async res=>{
                        setLoading(false);

                        const json = await res.json();

                        if(!res.ok){ setServerError(json.error); console.log(serverError()) }
                    }).catch(err=>{
                        setLoading(false);
                    });
                },
            })
        ])
    ])
}