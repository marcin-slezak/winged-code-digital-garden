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
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
    </Head>
    <div className={styles.layoutContainer}>
        <Menu />
        {children}
    </div>
    <Footer />
</div>