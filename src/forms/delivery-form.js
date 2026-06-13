import { CapSelector } from "../components/cap-selector";
import { CitySelector } from "../components/city-selector";
import { jd } from "../jd.config";

/*const BoxSizes = {
    small: { base: 4, height: 2, height: 4 },
    medium: { base: 6, height: 3, height: 6 },
    large: { base: 8, height: 4, height: 6 }
}*/

export function DeliveryForm() {
    return jd.form({ className: 'flex flex-row gap-8' }, [
        jd.div({ className: 'w-full' }, [
            jd.h1({ className: 'text-xl font-bold' }, ['Package details']),

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
                jd.legend({ className: 'fieldset-legend' }, ['Box weight (kg)']),
                jd.div({ className: 'flex flex-col' }, [
                    jd.input({
                        required: true,
                        className: 'input w-full validator',
                        type: 'number',
                        name: 'weight',
                        id: 'weight',
                        placeholder: '10kg',
                        min: '0',
                        max: '500'
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
        jd.div({ className: 'border-base-content border-l' }),
        jd.div({ className: 'w-full' }, [
            jd.h1({ className: 'text-xl font-bold' }, ['Delivery details']),

            jd.fieldset({ className: 'fieldset w-full' }, [
                jd.legend({ className: 'fieldset-legend' }, ['Recipient']),
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
                jd.legend({ className: 'fieldset-legend' }, ['Select cap and city']),
                CapSelector()
            ]),
        ])
    ])
}