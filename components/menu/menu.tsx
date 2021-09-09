import React, { FunctionComponent } from 'react';
import styles from './menu.module.css';

export const Menu: FunctionComponent = () => <div className={styles.menuContainer}>
    <div className={styles.logoText}>
        <a className={styles.showBig} href="/">Winged Code</a>
        <a className={styles.showSmall} href="/">W &#123; &#125;</a>
    </div>
    <div>
        <ul className={styles.linksContainer}>
            <li><a href="/garden">Digital garden</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
    </div>
</div>