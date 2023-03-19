import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './MiniVideoCard.module.scss'

export interface MiniVideoCardProps extends React.ComponentPropsWithoutRef<'button'>{
    text: string;
    number: number;
}

const MiniVideoCard: React.FC<MiniVideoCardProps> = ({text = 'video', number, disabled, ...rest}) => {
    const router = useRouter()
    return (
        <button className={styles['mini-card']} disabled={disabled} {...rest}>
            <p className={styles['text']}>{number}{'. '}{text}</p>
        </button>
    );

};

export default MiniVideoCard;
