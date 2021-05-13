import {useRouter} from 'next/router';
import {useEffect} from 'react';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        (async () => {
            await router.push('/product')
        })();
    }, []);

    return <div />
}

export default Home;
