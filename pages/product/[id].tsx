import {GetServerSideProps} from 'next';
import {Product} from '@myTypes/product';
import {useRouter} from 'next/router';
import {Button, Divider, List, Typography} from 'antd';
import ProductService from '@services/product.service';
import {FeatureFlag} from '@myTypes/feature-flag';
import FeatureFlagService from '@services/featureFlags.service';
import PageHeader from '@components/PageHeader';
import FeatureFlagCard from '@components/FeatureFlagCard';
import Box from '@components/Box';
import {useMemo} from 'react';
import FeatureFlagCardRegister from '@components/FeatureFlagCardRegister';

interface ProductViewProps {
    product: Product,
    featureFlags?: FeatureFlag[],
}

export const getServerSideProps: GetServerSideProps<ProductViewProps> = async ({ params }) => {
    const id = params.id as string;
    const res = await ProductService.getProduct(id);
    const product = res.data;

    const resFeatureFlags = await FeatureFlagService.getAllByFilter({ productName: product.name })
    const data = resFeatureFlags.data;
    const register: FeatureFlag[] = [
        {
            productName: product.name,
            featureName: '',
            active: false,
            dateToIgnoreProps: null,
            canUse: [],
        }
    ];
    const featureFlags = register.concat(data);
    return {
        props: {
            product,
            featureFlags,
        }
    }
}

const ProductDetail = ({product, featureFlags}: ProductViewProps) => {
    const router = useRouter();
    const { _id, name } = product;

    const featuresUsed = useMemo(() => featureFlags.map(f => f.featureName), [featureFlags]);

    return (
        <>
            <PageHeader title={name} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography.Title>{name}</Typography.Title>
                <Box display="flex">
                    <Button type="ghost" onClick={() => router.back()}>Voltar</Button>
                    <Box marginLeft={8}>
                        <Button className="btn ant-btn-danger" type="primary" onClick={() => console.log(_id)}>Excluir</Button>
                    </Box>
                </Box>
            </div>
            <Divider />
            <List grid={{ gutter: 8, column: 4 }} style={{ justifyItems: 'stretch' }} dataSource={featureFlags} renderItem={(item: FeatureFlag, index) => {
                if (index === 0) {
                    return (
                        <List.Item>
                            <FeatureFlagCardRegister featuresUsed={featuresUsed} productName={product.name} />
                        </List.Item>
                    )
                }
                return (
                    <List.Item>
                        <FeatureFlagCard featureFlagInitial={item} />
                    </List.Item>
                )
            }}/>

        </>
    )
}

export default ProductDetail;
