import styles from './main-layout.module.scss';
import Header from '@components/Header';
import Head from 'next/head';
import React from 'react';

interface MainLayoutProps {
    title: string;
    children: React.ReactNode;
}

function MainLayout({ children, title }: MainLayoutProps) {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <div className={styles.mainLayout}>
                <Header title="Features Flag Manager" />
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MainLayout;
