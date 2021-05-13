import {useRouter} from 'next/router';
import {Button, Card, Divider, Form, Input, Typography} from 'antd';
import {useEffect, useRef} from 'react';
import axios from 'axios';
import PageHeader from '@components/PageHeader';
import Box from '@components/Box';
import {toast} from 'react-hot-toast';

const NewFeature = () => {
    const inputRef = useRef<any>(null);
    const router = useRouter();

    useEffect(() => {
        inputRef!.current!.focus({cursor: 'end'});
    }, [inputRef])

    const onSubmit = async (values) => {
        const promise = axios.post('/api/feature', values)
        await toast.promise(promise, {
            error: (err) => err.toString(), loading: 'Salvando feature...',
            success: () => {
                router.push('/feature')
                return 'Feature cadastrada';
            }
        })
    }

    return (
        <>
            <PageHeader title="Nova feature"/>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography.Title>Nova feature</Typography.Title>
                <Button type="ghost" onClick={() => router.back()}>Voltar</Button>
            </Box>
            <Divider/>
            <Form onFinish={onSubmit} style={{maxWidth: 320}}>
                <Card title={<Typography.Title level={4}>Feature</Typography.Title>}>
                    <Form.Item
                        label="Nome"
                        name="name"
                        rules={[{required: true, message: 'Por favor, insira um nome!'}]}
                    >
                        <Input ref={inputRef}/>
                    </Form.Item>
                    <Box display={'flex'} alignItems={'center'} justifyItems={'flex-end'}>
                        <Button type="primary" htmlType="submit">Cadastrar</Button>
                    </Box>
                </Card>
            </Form>
        </>
    )
}

export default NewFeature;
