import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import styles from './CoursePage.module.scss'
import MiniVideoCard from "@/components/pages/course-page/mini-video-card";
import {CustomStarIcon} from "@/components/custom-svg/CustomStarIcon";
import course from "@/pages/course";
import {useQuery} from "react-query";
import {API} from "@/api/CourseApi";
import {Lesson} from "@/api/Lesson";


const CoursePage = () => {

    const router = useRouter();
    const courseId = router.query.courseId as string;

    const {isLoading, isError, data} = useQuery(
        ['course', courseId],
        () => API.getCourse(courseId),
        {
            refetchOnWindowFocus: false,
            retry: false,
            enabled: courseId != null,
        },
    );
    if (isError) {
        setTimeout(() => {
            void router.push('/dfd404');
        }, 3000);
    }
    const [videoData, setVideoData] = useState<Lesson>();
    useEffect(() => {
        data && setVideoData(data.lessons[0]);
    }, [data]);
    console.log(videoData);



    if (!!videoData && !!data) {
        return (
            <div className={styles['page']}>
                <div className={styles['heading']}>
                    <div className={styles['star']}><CustomStarIcon/></div>
                    <p>COURSES 4 U</p>
                    <div className={styles['star']}><CustomStarIcon/></div>
                </div>
                <div className={styles['video-and-video-list']}>
                    <div className={styles['video']}>
                        <img src={`${videoData.previewImageLink}/lesson-${videoData.order}.webp`}
                             alt={'sdasdas'}></img>
                        <p>{videoData.title}</p>
                    </div>
                    <div className={styles['videos-list']}>
                        <p>{data.title}</p>
                        {data.lessons.map((lesson, index) => (
                            <MiniVideoCard
                                key={index}
                                text={lesson.title}
                                disabled={
                                    lesson.status == 'unlocked'}
                                onClick={()=>{setVideoData(lesson)}}

                        />
                    ))

                    }
                </div>
            </div>

        </div>

        );
    }

};

export default CoursePage;
