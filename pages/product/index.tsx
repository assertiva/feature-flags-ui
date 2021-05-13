import {GetServerSideProps} from "next";
import {Product} from '@myTypes/product';
import {Button, Card, Divider, List, Typography} from 'antd';
import {DeleteOutlined, EyeOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {useRouter} from 'next/router';
import ProductService from '@services/product.service';
import PageHeader from '@components/PageHeader';

interface ProductProps {
    products: Product[];
}

export const getServerSideProps: GetServerSideProps<ProductProps> = async () => {
    const res = await ProductService.getProducts();
    return {
        props: {
            products: await res.data
        }
    }
}

const Products = ({products}: ProductProps) => {
    const router = useRouter();

    return (
        <>
            <PageHeader title="Produtos" />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography.Title>Produtos</Typography.Title>
                <Button type="primary" shape="round" icon={<PlusCircleOutlined />} size="large" onClick={() => router.push('/product/new')}>
                    Novo produto
                </Button>
            </div>
            <Divider />
            <List
                dataSource={products}
                grid={{ gutter: 8, column: 6 }}
                renderItem={item => (
                    <List.Item>
                        <Card title={<Typography.Title level={5}>{item.name}</Typography.Title>}>
                            <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <Button onClick={() => router.push(`/product/${item._id}`)} icon={<EyeOutlined />} >Visualizar</Button>
                                <Button className="btn ant-btn-danger" icon={<DeleteOutlined />} onClick={() => alert('remover')}>Remover</Button>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </>
    )
};

export default Products;
