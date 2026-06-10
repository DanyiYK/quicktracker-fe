import { createSignal, effect, when } from "@just-dom/signals";
import { jd } from "../jd.config";

export function CourierForm(props = {}) {
    const { onsubmit, title = '', submit_text = 'Submit', data={}, loadingSignal, errorSignal, dataSignal } = props;
    const { name='', surname='', fiscal_code='', email='', phone_number='' } = data;

    console.log('creating form')

    return jd.form({
        className: 'flex flex-col items-center gap-1',
        onsubmit: onsubmit,
        ref: (el)=>{
            console.log(dataSignal)
            if(!dataSignal) { return console.log('data signal is null') }
            
            effect(el, ()=>{
                const formData = dataSignal()
                console.log('updated obj')
                let obj;

                Object.keys(formData).forEach((key)=>{
                    obj = el.querySelector(`#${key}`)

                    if(obj){
                        obj.value = formData[key];
                    }
                })
            })
        }
    }, [
        jd.h2({ className: 'text-2xl font-bold text-base-content' }, [title]),
        jd.hr({ className: 'w-full text-base-100' }),
        jd.fieldset({ className: 'fieldset w-full' }, [
            jd.legend({ className: 'fieldset-legend' }, ['Name']),
            jd.div({ className: 'flex flex-col' }, [
                jd.input({
                    required: true,
                    className: 'input w-full validator',
                    value: name,
                    name: 'name',
                    id: 'name',
                    placeholder: 'Mario',
                    oninput: (e) => {
                        if (e.target.value.length < 3) {
                            e.target.setCustomValidity('Name is too short!')
                        } else {
                            e.target.setCustomValidity('')
                        }
                    }
                }),
                jd.div({ className: 'validator-hint hidden' }, ['Name is invalid!'])
            ])
        ]),
        jd.fieldset({ className: 'fieldset w-full' }, [
            jd.legend({ className: 'fieldset-legend' }, ['Surname']),
            jd.div({ className: 'flex flex-col' }, [
                jd.input({
                    required: true,
                    value: surname,
                    className: 'input w-full validator',
                    name: 'surname',
                    id: 'surname',
                    placeholder: 'Rossi',
                    oninput: (e) => {
                        if (e.target.value.length < 3) {
                            e.target.setCustomValidity('Surname is too short!')
                        } else {
                            e.target.setCustomValidity('')
                        }
                    }
                }),
                jd.div({ className: 'validator-hint hidden' }, ['Surname is invalid!'])
            ])
        ]),
        jd.fieldset({ className: 'fieldset w-full' }, [
            jd.legend({ className: 'fieldset-legend' }, ['Fiscal code']),
            jd.div({ className: 'flex flex-col' }, [
                jd.input({
                    required: true,
                    value: fiscal_code,
                    className: 'input w-full validator',
                    name: 'fiscal_code',
                    id: 'fiscal_code',
                    placeholder: 'RSSMRA80E15H501U',
                    pattern: '^[A-Z]{6}[0-9LMNPQRSTUVX]{2}[A-Z]{1}[0-9LMNPQRSTUVX]{2}[A-Z]{1}[0-9LMNPQRSTUVX]{3}[A-Z]{1}$'
                }),
                jd.div({ className: 'validator-hint hidden' }, ['Fiscal code is invalid!'])
            ])
        ]),
        jd.fieldset({ className: 'fieldset w-full' }, [
            jd.legend({ className: 'fieldset-legend' }, ['Email']),
            jd.div({ className: 'flex flex-col' }, [
                jd.input({
                    required: true,
                    value: email,
                    className: 'input w-full validator',
                    name: 'email',
                    id: 'email',
                    placeholder: 'courier@example.com',
                    oninput: (e) => {
                        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)) {
                            e.target.setCustomValidity('Invalid fiscal code')
                        } else {
                            e.target.setCustomValidity('')
                        }
                    }
                }),
                jd.div({ className: 'validator-hint hidden' }, ['Email is invalid!'])
            ])
        ]),
        jd.fieldset({ className: 'fieldset w-full' }, [
            jd.legend({ className: 'fieldset-legend' }, ['Phone number']),
            jd.div({ className: 'flex flex-col' }, [
                jd.input({
                    required: true,
                    value: phone_number,
                    className: 'input w-full validator',
                    name: 'phone_number',
                    id: 'phone_number',
                    placeholder: '+39 123 456 7890',
                    oninput: (e) => {
                        if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(e.target.value)) {
                            return e.target.setCustomValidity('Phone number structure is invalid!')
                        }

                        if (e.target.value.length < 10) {
                            return e.target.setCustomValidity('Invalid length (minimum of 10 digits required)')
                        }

                        e.target.setCustomValidity('')
                    }
                }),
                jd.div({ className: 'validator-hint hidden' }, ['Phone number is invalid!'])
            ])
        ]),
        jd.button({ className: 'btn duration-150 hover:btn-primary', type: 'submit' }, [
            when(loadingSignal, {
                then: () => jd.lucide('Loader2', { className: 'size-4 animate-spin' }),
                else: () => jd.lucide('ArrowRight', { className: 'size-4' }),
            }),
            submit_text
        ]),
        jd.p({
            className: 'text-error mt-2',
            style: {
                display: 'None'
            },
            ref: (obj)=>{
                effect(obj, ()=>{
                    if(errorSignal()){
                        obj.textContent = errorSignal();
                        obj.style.display = 'Block';
                    } else {
                        obj.style.display = 'None';
                    }
                })
            }
        }),
    ])
}