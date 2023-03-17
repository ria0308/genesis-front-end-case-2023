import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './MiniVideoCard.module.scss'
import {CustomDisabledIcon} from "@/components/custom-svg/CustomDisabledIcon";

export interface MiniVideoCardProps {
    text: string;
    link: string;
    isDisabled: boolean;
}

const MiniVideoCard: React.FC<MiniVideoCardProps> = ({text = 'video', link, isDisabled = false}) => {
    const router = useRouter()
    return (
        <div className={styles[`mini-card${isDisabled ? '-disabled' : ''}`]}>
            <a className={styles['text']} href={link}>{text}</a>
            {isDisabled && <div className={styles['icon']}><CustomDisabledIcon/></div>}
        </div>
    );
};

export default MiniVideoCard;
