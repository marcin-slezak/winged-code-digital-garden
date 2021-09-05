import React, { FunctionComponent, useRef, useEffect } from "react";
import W from '../../public/img/w.svg';
import useMousePosition from './useMousePosition';
import styles from './animatedSvg.module.css';

export type AnimatedSvgProps = {}

export const AnimatedSvg: FunctionComponent<AnimatedSvgProps> = () => {
    const { x, y } = useMousePosition();
    const svgRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();
    useEffect(() => {
        if(!svgRef.current || !x || !y){
            return;
        }
        const [, ...wings] = Array.from(svgRef.current.childNodes[0].childNodes[1].childNodes) as Element[];
        const animate = () => {
            wings.forEach((node, i) => {
                const {x:x2, y:y2} = node.getBoundingClientRect()
                const angle = Math.atan2(y2 - y, x2 - x) * 180 / Math.PI;
                node.setAttribute('transform', `${node.getAttribute('transform')?.split('rotate')[0]} rotate(${angle} 10 20)`)
            })
        }
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if(requestRef.current){
                cancelAnimationFrame(requestRef.current);
            }
        }
    }, [x,y]);
    return (
        <div ref={svgRef}>
            <W className={styles.svg} />
        </div>
    )
}