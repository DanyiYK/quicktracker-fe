import { createSignal, when } from "@just-dom/signals";
import { jd } from "../jd.config";

export function CourierForm(props={}) {
    const { onsubmit, title='', submit_text='Submit'  } = props;
    
    const [ loading, setLoading ] = createSignal(false);
    
    let errorToShow;
    const [ formError, setFormError ] = createSignal(false);

    return jd.form({ className: 'flex flex-col items-center gap-2' }, [
        jd.h2({ className: 'text-2xl font-bold text-base-content' }, [title]),
        jd.hr({ className: 'w-full text-base-100' }),
        jd.fieldset({ className: 'fieldset w-full' }, [
            jd.legend({ className: 'fieldset-legend' }, ['Fiscal code']),
            jd.input({
                required: true,
                className: 'input w-full validator',
                name: 'fiscal_code',
                id: 'fiscal_code',
                placeholder: 'RSSMRA80E15H501U',
                pattern: '^[A-Z]{6}[0-9LMNPQRSTUVX]{2}[A-Z]{1}[0-9LMNPQRSTUVX]{2}[A-Z]{1}[0-9LMNPQRSTUVX]{3}[A-Z]{1}$'
            }),
            jd.div({ className: 'validator-hint hidden' }, ['Fiscal code is invalid!'])
        ]),
        jd.fieldset({ className: 'fieldset w-full' }, [
            jd.legend({ className: 'fieldset-legend' }, ['Email']),
            jd.input({
                required: true,
                className: 'input w-full validator',
                type: 'email',
                name: 'courier_email',
                id: 'courier_email',
                placeholder: 'courier@example.com', // TODO: find a working patter for emails
            }),
            jd.div({ className: 'validator-hint hidden' }, ['Email is invalid!'])
        ]),
        jd.fieldset({ className: 'fieldset w-full' }, [
            jd.legend({ className: 'fieldset-legend' }, ['Phone number']),
            jd.input({
                required: true,
                className: 'input w-full validator',
                name: 'phone',
                id: 'phone',
                placeholder: '+39 123 456 7890',
                pattern: "" // TODO: find a working pattern for phone number
            }),
            jd.div({ className: 'validator-hint hidden' }, ['Phone number is invalid!'])
        ]),
        jd.button({ className: 'btn duration-150 hover:btn-primary', type: 'submit' }, [
            when(loading, {
                then: () => jd.lucide('Loader2', { className: 'size-4 animate-spin' }),
                else: () => jd.lucide('LogIn', { className: 'size-4' }),
            }),
            submit_text
        ]),
        when(formError, {
            then: () => jd.p({ className: 'text-error' }, errorToShow||'Error placeholder'),
            else: () => jd.fragment()
        })
    ])
}