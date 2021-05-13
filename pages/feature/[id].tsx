import {GetServerSideProps} from 'next';
import {Feature} from '@myTypes/feature';
import {useRouter} from 'next/router';
import {Button, Typography} from 'antd';
import FeatureService from '@services/feature.service';
import PageHeader from '@components/PageHeader';

export const getServerSideProps: GetServerSideProps<Feature> = async ({ params }) => {
    const id = params.id as string;
    const res = await FeatureService.getFeature(id);
    const feature = res.data;

    return {
        props: feature
    }
}

const FeatureDetail = ({ _id, name }: Feature) => {
    const router = useRouter();

    return (
        <>
            <PageHeader title={name} />
            <Typography.Title>{name}</Typography.Title>
            <br /><br />
            <Button type="ghost" onClick={() => router.back()}>Voltar</Button>
        </>
    )
}

export default FeatureDetail;
