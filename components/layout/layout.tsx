import React, { FunctionComponent, useEffect } from 'react';
import CookieConsent from "react-cookie-consent";
import Head from 'next/head'
import ReactGA from 'react-ga'
import { Menu } from '../menu'
import { Footer } from '../footer'
import styles from './layout.module.css';

export type LayoutProps = {

}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
    useEffect(() => {
        if(process.env.NEXT_PUBLIC_GA_TRACING_CODE && document.location.href !== 'http://localhost:3000/'){
          ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACING_CODE);
          ReactGA.pageview(document.location.pathname);
        }
      },[])
    return (
        <div>
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
                <CookieConsent>
                    I'm using cookies on this website to understand what you are looking for the most and, eventually, improve your experience 😇
                </CookieConsent>
            </div>
            <Footer />
        </div>
    )
}