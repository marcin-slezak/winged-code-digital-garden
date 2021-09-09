import React, {FunctionComponent} from 'react';
import styles from './pane.module.css';

export type PaneProps = {
    
}
export const Pane:FunctionComponent<PaneProps> = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}