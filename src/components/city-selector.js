import { createSignal, when } from "@just-dom/signals";
import { jd } from "../jd.config";
import { VITE_API_URL } from "../env";

export function CitySelector() {
    const citySelector = jd.select({
        className: 'select',
        required: true,
    })

    const provinceSelector = jd.select({
        className: 'select',
        required: true,
        onchange: e => {
            // setLoading(true);
            citySelector.setAttribute('disabled', true);

            fetch(`${VITE_API_URL}/location/province/${provinceSelector.value}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(async res => {
                const json = await res.json();

                if (!res.ok) { return alert(`Failed to fetch province: ${json.error || 'Unknown error'}`) }

                citySelector.innerHTML = '';

                json.cities.forEach(city => citySelector.appendChild(jd.option({ value: city.istat_code }, [city.name])))

                // setLoading(false);
                citySelector.removeAttribute('disabled');
            })
        }
    })

    const regionSelector = jd.select({
        className: 'select',
        required: true,
        onchange: e => {
            // setLoading(true);
            citySelector.setAttribute('disabled', true);
            provinceSelector.setAttribute('disabled', true);
            
            console.log(regionSelector.value);

            fetch(`${VITE_API_URL}/location/region/${regionSelector.value}/provinces`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(async res => {
                const json = await res.json();

                if (!res.ok) { return alert(`Failed to fetch provinces: ${json.error || 'Unknown error'}`) }

                provinceSelector.innerHTML = '';
                citySelector.innerHTML = '';

                json.forEach(province => provinceSelector.appendChild(jd.option({ value: province.code }, [province.name])))

                // setLoading(false);
                provinceSelector.removeAttribute('disabled');

                provinceSelector.dispatchEvent(new Event('change'));
            })
        }
    })
    
    fetch(`${VITE_API_URL}/location/regions`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(async res => {
        const json = await res.json();

        if (!res.ok) { return alert(`Failed to fetch regions: ${json.error || 'Unknown error'}`) }

        regionSelector.innerHTML = '';

        json.forEach(region => regionSelector.appendChild(jd.option({ value: region.istat_code }, [region.name])))
        // setLoading(false);

        regionSelector.dispatchEvent(new Event('change'));
    })

    return jd.div({ className: 'flex gap-2 items-center max-w-lg' }, [
        regionSelector,
        '>',
        provinceSelector,
        '>',
        citySelector,
    ])
}