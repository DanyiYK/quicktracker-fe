import { jd } from "../jd.config";

export function NotFoundPage() {
    return jd.div({ className: 'h-full bg-transparent flex justify-center items-center flex-col gap-4' }, [
        jd.lucide('FileWarning', { size: 64, className: 'text-error' }),
        jd.h1({ className: 'text-4xl font-bold mb-2' }, ['404 - Not found']),
        jd.p({ className: 'text-lg text-gray-400 text-wrap max-w-2xl text-center' }, ['The page you are trying to reach was deleted or does not exist, please, select the options below:']),
        jd.div({ className: 'flex gap-4' }, [
            jd.a({ className: 'btn hover:btn-primary', href: '/' }, ['Main page']),
            jd.a({ className: 'btn hover:btn-primary', href: '/track' }, ['Track a package'])
        ])
    ])
}
