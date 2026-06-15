import { CapSelector } from "../components/cap-selector";
import { CitySelector } from "../components/city-selector";
import { jd } from "../jd.config";

/*const BoxSizes = {
    small: { base: 4, height: 2, height: 4 },
    medium: { base: 6, height: 3, height: 6 },
    large: { base: 8, height: 4, height: 6 }
}*/

export function DeliveryForm({ onsubmit }) {
    return jd.form({ className: 'flex w-4xl mx-auto flex-col gap-8', onsubmit: onsubmit }, [
        jd.div({ className: 'w-full flex flex-col gap-2' }, [
            jd.h1({ className: 'text-xl font-bold' }, ['Package details']),

            jd.hr(),

            jd.fieldset({ className: 'fieldset w-full' }, [
                jd.legend({ className: 'fieldset-legend' }, ['Box content']),
                jd.div({ className: 'flex flex-col' }, [
                    jd.input({
                        required: true,
                        className: 'input w-full validator',
                        name: 'content',
                        id: 'content',
                        placeholder: 'Flowers',
                    }),
                    jd.div({ className: 'validator-hint hidden' }, ['Invalid box content!'])
                ])
            ]),
            jd.fieldset({ className: 'fieldset w-full' }, [
                jd.legend({ className: 'fieldset-legend' }, ['Box weight (1-500kg)']),
                jd.div({ className: 'flex flex-col' }, [
                    jd.input({
                        required: true,
                        className: 'input w-full validator',
                        type: 'text',
                        name: 'weight',
                        id: 'weight',
                        placeholder: '10kg',
                        oninput: e => {
                            const value = parseFloat(e.target.value);

                            if (isNaN(value)) {
                                return e.target.setCustomValidity('Input must be a number');
                            }

                            if (value <= 0 || value > 500) {
                                return e.target.setCustomValidity('Input must be between 0.01 and 500');
                            }

                            e.target.setCustomValidity('');
                        },

                        onchange: e => {
                            const value = parseFloat(e.target.value);

                            if (isNaN(value)) {
                                return;
                            }

                            e.target.value = value.toString();
                        }
                    }),
                    jd.div({ className: 'validator-hint hidden' }, ['Invalid weight!'])
                ])
            ]),
            jd.fieldset({ className: 'fieldset w-full' }, [
                jd.legend({ className: 'fieldset-legend' }, ['Box size']),
                jd.select({
                    className: 'select w-full',
                    placeholder: 'Select size',
                    id: 'size',
                    name: 'size',
                }, [
                    jd.option({ default: 'true', value: 'small' }, ['Small']),
                    jd.option({ value: 'medium' }, ['Medium']),
                    jd.option({ value: 'large' }, ['Large']),
                ]),
            ]),
            jd.fieldset({ className: 'fieldset w-full' }, [
                jd.legend({ className: 'fieldset-legend' }, ['Fragile']),
                jd.div({ className: 'flex gap-2' }, [
                    jd.input({
                        className: 'checkbox',
                        type: 'checkbox',
                        id: 'fragile',
                        name: 'fragile',
                    }),
                ])
            ]),
        ]),
        //jd.div({ className: 'border-base-content border-l' }),
        jd.div({ className: 'w-full flex flex-col gap-2' }, [
            jd.h1({ className: 'text-xl font-bold' }, ['Delivery details']),

            jd.hr(),

            jd.h2({ className: 'text-lg font-bold' }, ['Sender']),

            jd.fieldset({ className: 'fieldset w-full' }, [
                jd.legend({ className: 'fieldset-legend' }, ['Name']),
                jd.div({ className: 'flex flex-col' }, [
                    jd.input({
                        required: true,
                        className: 'input w-full validator',
                        name: 'sender',
                        id: 'sender',
                        placeholder: 'John Doe',
                    }),
                    jd.div({ className: 'validator-hint hidden' }, ['Invalid sender!'])
                ])
            ]),
            jd.fieldset({ className: 'fieldset w-full' }, [
                jd.legend({ className: 'fieldset-legend' }, ['Select sender cap and city']),
                CapSelector({ postalCodeId: 'sender_cap', citySelectorId: 'sender_city' })
            ]),

            jd.fieldset({ className: 'fieldset w-full' }, [
                jd.legend({ className: 'fieldset-legend' }, ['Address']),
                jd.div({ className: 'flex flex-col' }, [
                    jd.input({
                        required: true,
                        className: 'input w-full validator',
                        name: 'sender_address',
                        id: 'sender_address',
                        placeholder: 'via Roma, 46A',
                    }),
                    jd.div({ className: 'validator-hint hidden' }, ['Invalid address!'])
                ])
            ]),

            jd.h1({ className: 'text-xl font-bold' }, ['']),

            jd.h2({ className: 'text-lg font-bold' }, ['Recipient']),

            jd.fieldset({ className: 'fieldset w-full' }, [
                jd.legend({ className: 'fieldset-legend' }, ['Name']),
                jd.div({ className: 'flex flex-col' }, [
                    jd.input({
                        required: true,
                        className: 'input w-full validator',
                        name: 'recipient',
                        id: 'recipient',
                        placeholder: 'John Doe',
                    }),
                    jd.div({ className: 'validator-hint hidden' }, ['Invalid recipient!'])
                ])
            ]),
            jd.fieldset({ className: 'fieldset w-full' }, [
                jd.legend({ className: 'fieldset-legend' }, ['Select sender cap and city']),
                CapSelector({ postalCodeId: 'recipient_cap', citySelectorId: 'recipient_city' })
            ]),

            jd.fieldset({ className: 'fieldset w-full' }, [
                jd.legend({ className: 'fieldset-legend' }, ['Address']),
                jd.div({ className: 'flex flex-col' }, [
                    jd.input({
                        required: true,
                        className: 'input w-full validator',
                        name: 'recipient_address',
                        id: 'recipient_address',
                        placeholder: 'via Roma, 46A',
                    }),
                    jd.div({ className: 'validator-hint hidden' }, ['Invalid address!'])
                ])
            ]),

            jd.h1({ className: 'text-xl font-bold' }, ['']),

            jd.button({ className: 'btn duration-150 hover:btn-primary w-lg mx-auto', type: 'submit' }, ['Create']),
        ])
    ])
}