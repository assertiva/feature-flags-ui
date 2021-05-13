import {useRouter} from 'next/router';
import AntLayout from '@layouts/AntLayout';
import {Button, Card, Divider, Form, Input, Typography} from 'antd';
import {useEffect, useRef} from 'react';
import axios from 'axios';
import PageHeader from '@components/PageHeader';
import Box from '@components/Box';
import {toast} from 'react-hot-toast';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const NewProduct = () => {
    const inputRef = useRef<any>(null);
    const router = useRouter();

    useEffect(() => {
        inputRef!.current!.focus({ cursor: 'end' });
    }, [inputRef])

    const onSubmit = async (values) => {
        const promise = axios.post('/api/product', values);
        await toast.promise(promise, {
            error: (err) => err.toString(), loading: 'Salvando o produto...', success: () => {
                router.push('/product');
                return 'Produto cadastrado!'
            }
        })
    }

    return (
        <>
            <PageHeader title="Novo produto"/>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography.Title>Novo produto</Typography.Title>
                <Button type="ghost" onClick={() => router.back()}>Voltar</Button>
            </Box>
            <Divider/>
            <Form onFinish={onSubmit} style={{ maxWidth: 320 }}>
                <Card title={<Typography.Title level={4}>Produto</Typography.Title>}>
                    <Form.Item
                        label="Nome"
                        name="name"
                        rules={[{ required: true, message: 'Por favor, insira um nome!' }]}
                    >
                        <Input ref={inputRef} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: 8}}>Cadastrar</Button>
                </Card>
            </Form>
            <br/><br />
            <Button type="ghost" onClick={() => router.back()}>Voltar</Button>
        </>
    )
}

export default NewProduct;
