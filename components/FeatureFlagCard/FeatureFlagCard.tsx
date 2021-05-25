import {FeatureFlag} from '@myTypes/feature-flag';
import {Button, Card, DatePicker, Form, Select, Space, Typography} from 'antd';
import {DeleteOutlined, LockOutlined, SaveOutlined, UnlockOutlined} from '@ant-design/icons';
import {FC, useState} from 'react';
import FeatureFlagService from '@services/featureFlags.service';
import Box from '@components/Box';
import moment from 'moment/moment';
import {toast} from 'react-hot-toast';

interface FeatureFlagCardProps {
    featureFlagInitial: FeatureFlag;
}

const formatDate = 'DD/MM/YYYY';

function disabledDate(current) {
    return current && current < moment().endOf('day');
}

const FeatureFlagCard: FC<FeatureFlagCardProps> = ({featureFlagInitial}) => {
    const [form] = Form.useForm();
    const [featureFlag, setFeatureFlag] = useState(featureFlagInitial);
    const [editMode, setEdit] = useState(false);

    const toggleFeature = async () => {
        const newFeatureFlag = {...featureFlag, active: !featureFlag.active}
        const promise = FeatureFlagService.edit(featureFlag._id, newFeatureFlag);
        await toast.promise(promise, {
            success: () => {
                setFeatureFlag(newFeatureFlag);
                return `Feature ${featureFlag.featureName} ${newFeatureFlag.active ? 'ativada' : 'desativada'}`;
            },
            error: (err) => err.toString(),
            loading: 'Aplicando alterações...'
        })
    }

    const submit = (data) => {
        const date = data['dataToIgnoreProps'];
        const dateToIgnoreProps = date ? date.format(formatDate) : null;
        const newFeatureFlag: FeatureFlag = {
            ...data,
            dateToIgnoreProps,
        }
        const promise = FeatureFlagService.edit(featureFlagInitial._id, newFeatureFlag).then(res => {
            if (res.status === 200) {
                setFeatureFlag(res.data);
                setEdit(false);
            }
        })

        toast.promise(promise, {
            error: undefined,
            loading: 'Salvando alterações...',
            success: () => 'Regra atualizada!',
        })
    }

    const date = featureFlagInitial.dateToIgnoreProps ? moment(featureFlagInitial.dateToIgnoreProps, formatDate) : '';

    return (
        <Card style={{ minHeight: 260, position: 'relative' }} title={
            <Box display="flex" alignItems="center" justifyContent="space-between" padding={8}>
                <Typography.Title level={4} style={{textTransform: 'capitalize', marginBottom: 0}}>{
                    featureFlag.featureName
                }</Typography.Title>
                {
                    !editMode &&
                    <Button type={featureFlag.active ? 'ghost' : 'primary'}
                            icon={featureFlag.active ? <LockOutlined/> : <UnlockOutlined/>}
                            onClick={toggleFeature}>{featureFlag.active ? 'Desativar' : 'Ativar'}</Button>
                }
            </Box>
        }>
            <Box padding={8}>
                <Form onFinish={submit} form={form}>
                    <Form.Item name="featureName" label="" hidden
                               rules={[{ required: true, message: 'Você precisa selecionar uma feature!' }]}
                               initialValue={featureFlag.featureName} />
                    <Form.Item name="productName" hidden required initialValue={featureFlag.productName}/>
                    <Form.Item name="active" hidden initialValue={featureFlag.active}/>
                    <Form.Item name="canUse" required={false} label="Quem pode utilizar"
                               initialValue={featureFlag.canUse}>
                        <Select mode="tags" placeholder="Aperte enter após cada inserção" disabled={!editMode}/>
                    </Form.Item>
                    <Form.Item name="dataToIgnoreProps" required={false} label="Data de ativação geral" initialValue={date}>
                        <DatePicker disabledDate={disabledDate} format={formatDate} disabled={!editMode}/>
                    </Form.Item>
                    {
                        editMode &&
                        <Box position={'absolute'} bottom={20} right={20} display="flex" alignItems="center" justifyContent="flex-end">
                            <Space size={[8, 2]} wrap>
                                <Button icon={<SaveOutlined/>} htmlType="submit"> Salvar </Button>
                                <Button className="btn ant-btn-danger" htmlType="button"
                                        icon={<DeleteOutlined/>} onClick={() => setEdit(false)}>Cancelar</Button>
                            </Space>
                        </Box>
                    }
                </Form>
                {
                    !editMode &&
                    <Box position={'absolute'} bottom={20} right={20} display="flex" alignItems="center" justifyContent="flex-end">
                        <Space size={[8, 2]} wrap>
                            <Button icon={<SaveOutlined/>} onClick={() => setEdit(true)}
                                    htmlType="button"> Editar </Button>
                            <Button className="btn ant-btn-danger" htmlType="button"
                                    icon={<DeleteOutlined/>}>Excluir</Button>
                        </Space>
                    </Box>
                }
            </Box>
        </Card>
    )
}

export default FeatureFlagCard;
