import React, {FunctionComponent} from 'react';
import styles from './button.module.css';

export type ButtonProps = {
    text: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}
export const Button:FunctionComponent<ButtonProps> = ({onClick, text}) => {
    return (
        <button className={styles.button} onClick={onClick}>{text}</button>
    )
}