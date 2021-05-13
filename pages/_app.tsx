import 'antd/dist/antd.compact.css';
import {AppProps} from "next/app";
import AntLayout from '@layouts/AntLayout';
import {Toaster} from 'react-hot-toast';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <AntLayout>
            <Toaster position={'top-right'} />
            <Component {...pageProps}/>
        </AntLayout>
    )
};

export default MyApp
