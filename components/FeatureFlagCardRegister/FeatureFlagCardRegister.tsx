import Box from '@components/Box';
import {Button, Card, DatePicker, Form, Select, Space, Typography} from 'antd';
import {DeleteOutlined, SaveOutlined} from '@ant-design/icons';
import FeaturesSelectInput from '@components/FeaturesSelectInput';
import {useRouter} from 'next/router';
import {FC, useMemo, useState} from 'react';
import {FeatureFlag} from '@myTypes/feature-flag';
import FeatureFlagService from '@services/featureFlags.service';
import {toast} from 'react-hot-toast';
import moment from 'moment/moment';

interface FeatureFlagCardRegisterProps {
    productName: string;
    featuresUsed?: string[];
}

const formatDate = 'DD/MM/YYYY';

function disabledDate(current) {
    return current && current < moment().endOf('day');
}

const FeatureFlagCardRegister: FC<FeatureFlagCardRegisterProps> = ({ productName, featuresUsed = []}) => {

    const router = useRouter();
    const [form] = Form.useForm();
    const featureFlag = useMemo<FeatureFlag>(() => ({
        dateToIgnoreProps: null,
        active: false,
        canUse: [],
        featureName: '',
        productName
    }), [productName, featuresUsed]);

    const [used, setFeaturesUsed] = useState(featuresUsed);

    const submit = (data) => {
        const date = data['dataToIgnoreProps'];
        const dateToIgnoreProps = date ? date.format(formatDate) : null;
        const newFeatureFlag: FeatureFlag = {
            ...data,
            dateToIgnoreProps,
        }
        const promise = FeatureFlagService.save(newFeatureFlag);
        toast.promise(promise, {
            error: (err) => err.toString(),
            loading: 'Salvando nova regra...',
            success: () => 'Regra cadastrada!'
        }).then(() => {
            (async () => {
                form.resetFields();
                setFeaturesUsed(featuresUsed.concat([newFeatureFlag.featureName]))
                await router.replace(router.asPath)
            })()
        })
    }

    return (
        <Card style={{ minHeight: 260, position: 'relative' }} title={
            <Box display="flex" alignItems="center" justifyContent="space-between" padding={8}>
                <Typography.Title level={4} style={{textTransform: 'capitalize', marginBottom: 0}}>
                    Nova regra
                </Typography.Title>
            </Box>
        }>
            <Box padding={8}>
                <Form onFinish={submit} form={form}>
                    <Form.Item name="featureName" label="Feature"
                               rules={[{ required: true, message: 'Você precisa selecionar uma feature!' }]}
                               initialValue={featureFlag.featureName}>
                        <FeaturesSelectInput used={used} />
                    </Form.Item>
                    <Form.Item name="productName" hidden required initialValue={featureFlag.productName}/>
                    <Form.Item name="active" hidden initialValue={featureFlag.active}/>
                    <Form.Item name="canUse" required={false} label="Quem pode utilizar"
                               initialValue={featureFlag.canUse}>
                        <Select mode="tags" placeholder="Aperte enter após cada inserção" />
                    </Form.Item>
                    <Form.Item name="dataToIgnoreProps" required={false} label="Data de ativação geral" initialValue={null}>
                        <DatePicker disabledDate={disabledDate} format={formatDate} />
                    </Form.Item>
                    <Box position={'absolute'} bottom={20} right={20} display="flex" alignItems="center" justifyContent="flex-end">
                        <Space size={[8, 2]} wrap>
                            <Button icon={<SaveOutlined/>} htmlType="submit"> Salvar </Button>
                            <Button className="btn ant-btn-danger" htmlType="button"
                                    icon={<DeleteOutlined/>} onClick={() => form.resetFields()}>Cancelar</Button>
                        </Space>
                    </Box>
                </Form>
            </Box>
        </Card>
    )
}

export default FeatureFlagCardRegister;
