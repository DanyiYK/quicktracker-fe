import { createSignal, when } from "@just-dom/signals";
import { jd } from "../jd.config";
import { VITE_API_URL } from "../env";

export function CapSelector({ citySelectorId, postalCodeId }) {
    const citySelector = jd.select({
        className: 'select',
        name: citySelectorId,
        id: citySelectorId,
        required: true,
        disabled: true
    }, [jd.option({}, ['City'])])

    return jd.div({ className: 'flex gap-2 items-center max-w-lg' }, [
        jd.input({
            required: true,
            className: 'input',
            placeholder: 'Postal code',
            name: postalCodeId,
            id: postalCodeId,
            onchange: e => {
                citySelector.setAttribute('disabled', true);
                citySelector.value = null;

                if(e.target.value===''){
                    e.target.setCustomValidity('This field cannot be empty!');
                    return;
                }

                fetch(`${VITE_API_URL}/location/cities?cap=${e.target.value}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(async res => {
                    const json = await res.json();

                    if (!res.ok) { return alert(`Error: ${json.error | 'Unknown error'}`) }

                    citySelector.innerHTML = '';

                    if (json.length <= 0) {
                        e.target.setCustomValidity('Insert a valid CAP');
                        citySelector.appendChild(jd.option({}, ['City']));
                        return;
                    }


                    json.forEach(city => {
                        citySelector.append(jd.option({ value: city.istat_code }, [city.name]))
                    });

                    e.target.setCustomValidity('');
                    citySelector.removeAttribute('disabled');
                })
            }
        }),
        '>',
        citySelector,
    ])
}