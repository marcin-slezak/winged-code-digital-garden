import React, { FunctionComponent } from 'react';
import styles from './menu.module.css';

export const Menu: FunctionComponent = () => <div className={styles.menuContainer}>
    <div className={styles.logoText}>
        <a href="/">Winged Code</a>
    </div>
    <div>
        <ul className={styles.linksContainer}>
            <li><a href="/">Digital garden</a></li>
            <li><a href="/">Contact</a></li>
        </ul>
    </div>
</div>