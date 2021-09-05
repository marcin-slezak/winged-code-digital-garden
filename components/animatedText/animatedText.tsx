import React, { FunctionComponent, useState, useEffect } from 'react'
import styles from './animatedText.module.css'
export type AnimatedTextProps = {
    text: string[]
}

export const AnimatedText: FunctionComponent<AnimatedTextProps> = ({ text }) => {
    const [textIndex, setTextIndex] = useState(0);
    const [textLength, setTextLength] = useState(text[0].length);
    const [isRemoving, setIsRemoving] = useState(true);
    useEffect(() => {
        const baseDelta = 200 - Math.random() * 100;
        const delta =
            textLength === text[textIndex].length ? baseDelta * 15 :
                isRemoving ? baseDelta / 2 :
                    baseDelta;


        const timer = setTimeout(() => {

            if (isRemoving) {
                if (textLength > 0) {
                    setTextLength(length => length - 1);
                } else {
                    setTextIndex(index => text[index + 1] ? index + 1 : 0);
                    setIsRemoving(false);
                }
            } else {
                if (textLength < text[textIndex].length) {
                    setTextLength(length => length + 1);
                } else {
                    setIsRemoving(true);
                }
            }
        }, delta);
        return () => {
            clearTimeout(timer);
        };
    }, [textIndex, textLength, isRemoving]);

    return (
        <span className={styles.textContainer}>{text[textIndex].substr(0, textLength)}</span>
    )
}