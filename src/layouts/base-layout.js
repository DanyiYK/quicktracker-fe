import { Header } from "../components/header";
import { jd } from "../jd.config";

export function BaseLayout(props) {
    const { headerData={}, content=jd.fragment()} = props;

    return jd.div({ className: 'h-screen bg-base-100 flex flex-col' }, [
        Header(headerData),
        content
    ])
}