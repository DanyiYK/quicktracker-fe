import { CourierForm } from "../forms/CourierForm";
import { jd } from "../jd.config";

export function CourierPage() {
    return jd.div({ className: 'h-full flex flex-col items-center justify-center' }, [
        jd.div({ className: 'w-lg bg-base-200 px-4 py-2' }, [
            CourierForm({
                title: 'New courier',
                onsubmit: (e) => {
                    const data = new FormData(e.target);
                    print(data)
                }
            })
        ])
    ])
}