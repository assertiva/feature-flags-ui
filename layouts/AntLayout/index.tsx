import Link from 'next/link';
import {Layout, Menu, Typography} from 'antd';
import {AppstoreOutlined, ControlOutlined} from '@ant-design/icons';
import {useState} from 'react';

const {Sider, Content} = Layout;

const AntLayout = ({children}) => {
    const [keySelected, setKey] = useState('1');

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null}>
                <div className="logo" style={{ textAlign: 'center', padding: '16px 8px 8px' }}>
                    <Typography.Title level={3} style={{ color: 'white' }}>Feature Flags</Typography.Title>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[keySelected]} style={{ fontSize: 20 }}>
                    <Menu.Item onClick={() => setKey('1')} key="1" icon={<AppstoreOutlined style={{fontSize: 20}} />} style={{ marginBottom: 8}}>
                        <Link href="/product">
                            Produtos
                        </Link>
                    </Menu.Item>
                    <Menu.Item onClick={() => setKey('2')} key="2" icon={<ControlOutlined style={{fontSize: 20}} />} style={{ marginBottom: 8}}>
                        <Link href="/feature">
                            Features
                        </Link>
                    </Menu.Item>

                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default AntLayout;
