import React, { FunctionComponent } from 'react';
import styles from './footer.module.css';

export type FooterProps = {}

export const Footer: FunctionComponent<FooterProps> = () => (
    <div className={styles.footerContainer}>
        © Marcin Ślęzak - made with ❤
    </div>
)