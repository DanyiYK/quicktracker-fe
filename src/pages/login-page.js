import { createSignal, when } from "@just-dom/signals";
import { jd } from "../jd.config";
import { navigate } from "@just-dom/router";

export function LoginForm() {
    let loginError;

    if(localStorage.getItem('token')){
        navigate('/dashboard', { replace: true });
    }

    const [loading, setLoading] = createSignal(false);
    const [ authError, setAuthError ] = createSignal(false);

    function handleLogin(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        console.log('Sending data!', data);

        setAuthError(false);
        setLoading(true);

        fetch('http://127.0.0.1:5001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            setLoading(false);

            if (!res.ok) {
                loginError = 'Invalid credentials';
                setAuthError(true);

                return;
            }

            res.json().then(jsonData=>{
                localStorage.setItem('token', jsonData.token);
                navigate('/dashboard', { replace: true });
            })
        })
    }

    return jd.div({ className: 'flex justify-center items-center h-full' }, [
        jd.form({ className: 'px-4 py-2 flex flex-col items-center w-full max-w-sm bg-base-300 gap-4', onsubmit: handleLogin }, [
            jd.h2({ className: 'text-2xl font-bold text-base-content' }, ['Login']),
            jd.hr({ className: 'w-full text-base-100' }),
            jd.fieldset({ className: 'fieldset w-full' }, [
                jd.legend({ className: 'fieldset-legend' }, ['Email']),
                jd.input({
                    className: 'input w-full',
                    type: 'email',
                    name: 'email',
                    id: 'email',
                    placeholder: 'user@example.com'
                })
            ]),
            jd.fieldset({ className: 'fieldset w-full' }, [
                jd.legend({ className: 'fieldset-legend' }, ['Password']),
                jd.input({
                    className: 'input w-full',
                    type: 'password',
                    name: 'password',
                    id: 'password',
                    placeholder: '******'
                })
            ]),
            jd.button({ className: 'btn duration-150 hover:btn-primary', type: 'submit' }, [
                when(loading, {
                    then: () => jd.lucide('Loader2', { className: 'size-4 animate-spin' }),
                    else: () => jd.lucide('LogIn', { className: 'size-4' }),
                }),
                'Submit'
            ]),
            when(authError, {
                then: () => jd.p({className: 'text-error'}, loginError),
                else: () => jd.fragment()
            })
        ])
    ])
}