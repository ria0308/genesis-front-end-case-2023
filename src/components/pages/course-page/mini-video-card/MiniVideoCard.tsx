import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './MiniVideoCard.module.scss'
import {CustomDisabledIcon} from "@/components/custom-svg/CustomDisabledIcon";

export interface MiniVideoCardProps extends React.ComponentPropsWithoutRef<'button'>{
    text: string;
}

const MiniVideoCard: React.FC<MiniVideoCardProps> = ({text = 'video', disabled, ...rest}) => {
    const router = useRouter()
    return (
        <button className={styles['mini-card']} disabled={disabled} {...rest}>
            <p className={styles['text']}>{text}</p>
            {disabled && <div className={styles['icon']}><CustomDisabledIcon/></div>}
        </button>
    );

};

export default MiniVideoCard;
