import { createSignal } from "@just-dom/signals";
import { VITE_API_URL } from "../env";
import { CourierForm } from "../forms/CourierForm";
import { jd } from "../jd.config";

export function CourierPage(params) {

    const [ serverError, setServerError ] = createSignal('');
    const [ loading, setLoading ] = createSignal(false);
    const [ data, setData ] = createSignal({});

    fetch(`${VITE_API_URL}/courier/${params.id}/`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(async res=>{
        const json = await res.json();

        if(!res.ok) { setServerError(json.error || 'Server error'); return }

        setData(json);
        console.log(json)
    })
    
    return jd.div({ className: 'h-full flex flex-col items-center justify-center' }, [
        jd.div({ className: 'w-lg bg-base-200 px-4 py-2' }, [
            CourierForm({
                title: 'Courier page',
                submit_text: 'Update',
                dataSignal: data,
                loadingSignal: loading,
                errorSignal: serverError,
                onsubmit: (e) => {
                    e.preventDefault();

                    const data = new FormData(e.target);
                    
                    setLoading(true);

                    fetch(`${VITE_API_URL}/courier/${params.id}/`, {
                        method: "PATCH",
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(Object.fromEntries(data))
                    }).then(async res=>{
                        setLoading(false);
                        const json = await res.json();

                        if(!res.ok){ return setServerError(json.error||'Unknown error') }
                    }).catch(err=>{
                        alert(err);
                    });
                },
            })
        ])
    ])
}