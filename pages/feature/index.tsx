import {GetServerSideProps} from "next";
import {Feature} from '@myTypes/feature';
import {Button, Card, Divider, List, Typography} from 'antd';
import {DeleteOutlined, EyeOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {useRouter} from 'next/router';
import FeatureService from '@services/feature.service';
import PageHeader from '@components/PageHeader';

interface FeatureProps {
    features: Feature[];
}

export const getServerSideProps: GetServerSideProps<FeatureProps> = async () => {
    const res = await FeatureService.getFeatures();
    return {
        props: {
            features: res.data,
        }
    }
}

const Features = ({features}: FeatureProps) => {
    const router = useRouter();

    return (
        <>
            <PageHeader title="Features" />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography.Title>Features</Typography.Title>
                <Button type="primary" shape="round" icon={<PlusCircleOutlined />} size="large" onClick={() => router.push('/feature/new')}>
                    Nova feature
                </Button>
            </div>
            <Divider />
            <List
                dataSource={features}
                grid={{ gutter: 8, column: 6 }}
                renderItem={item => (
                    <List.Item>
                        <Card title={<Typography.Title level={5} style={{ textTransform: 'capitalize'}}>{item.name}</Typography.Title>}>
                            <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <Button onClick={() => router.push(`/feature/${item._id}`)} icon={<EyeOutlined />} >Visualizar</Button>
                                <Button className="btn ant-btn-danger" icon={<DeleteOutlined />} onClick={() => alert('remover')}>Remover</Button>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </>
    )
};

export default Features;
