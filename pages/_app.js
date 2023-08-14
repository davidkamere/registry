import { RecoilRoot } from 'recoil'
import './globals.css'


export default function App({ Component, pageProps }) {
    return (
        <RecoilRoot>
            <Component {...pageProps} />
        </RecoilRoot>
    )
}