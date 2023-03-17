import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import styles from './CoursePage.module.scss'
import MiniVideoCard from "@/components/pages/course-page/mini-video-card";
import testData from "@/api/testData";
import {CustomStarIcon} from "@/components/custom-svg/CustomStarIcon";



const CoursePage = () => {


const data = testData()

    return (
        <div className={styles['page']}>
            <div className={styles['heading']}>
                <div className={styles['star']}><CustomStarIcon/></div>
                <p>COURSES 4 U</p>
                <div className={styles['star']}><CustomStarIcon/></div>
            </div>
            <div className={styles['video-and-video-list']}>
                <div className={styles['video']}>
                    <img src={`${data.lessons[0].previewImageLink}/lesson-${data.lessons[0].order}.webp`}
                         alt={'sdasdas'}></img>
                    <p>{data.lessons[0].title}</p>
                </div>
                <div className={styles['videos-list']}>
                    <p>{data.title}</p>
                    {data.lessons.map((lesson, index) => (
                        <MiniVideoCard
                            key={index}
                            text={lesson.title}
                            isDisabled={
                                lesson.status == 'unlocked'}
                            link={lesson.link}

                        />
                    ))

                    }
                </div>
            </div>

        </div>

    );
};

export default CoursePage;
