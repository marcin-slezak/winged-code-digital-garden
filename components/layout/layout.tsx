import React, { FunctionComponent } from 'react';
import Head from 'next/head'
import { Menu } from '../menu'
import { Footer } from '../footer'
import styles from './layout.module.css';

export type LayoutProps = {

}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => <div>
    <Head>
        <title>Winged Code</title>
        <meta name="description" content="Winged Code Digital Garden" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet" />

    </Head>
    <div className={styles.layoutContainer}>
        <Menu />
        {children}
    </div>
    <Footer />
</div>