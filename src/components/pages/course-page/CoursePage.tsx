import React, {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import styles from './CoursePage.module.scss'
import MiniVideoCard from "@/components/pages/course-page/mini-video-card";
import {CustomStarIcon} from "@/components/custom-svg/CustomStarIcon";
import course from "@/pages/course";
import {useQuery} from "react-query";
import {API} from "@/api/CourseApi";
import {Lesson} from "@/api/Lesson";
import Loader from "@/components/ui/loader/Loader";
import Hls from 'hls.js';
import Video from "@/components/pages/course-page/video";


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
            void router.push('/');
        }, 3000);
    }
    const [videoData, setVideoData] = useState<Lesson>();
    useEffect(() => {
        data && data.lessons.sort((a, b) => {
            return a.order - b.order;
        });
        data && setVideoData(data.lessons[0]);
    }, [data]);


    {
        return (
            <div className={styles['page']}>
                <div className={styles['heading']}>
                    <div className={styles['star']}><CustomStarIcon/></div>
                    <p> COURSES 4 U </p>
                    <div className={styles['star']}><CustomStarIcon/></div>
                </div>
                {
                    !!data && !!videoData ?

                        (<div className={styles['video-and-video-list']}>

                            <div className={styles['video']}>


                                <Video link={videoData.link}
                                       poster={videoData.previewImageLink + '/lesson-' + videoData.order + '.webp'}/>

                                <h3>{data.title}: <br/> {videoData.order}. {videoData.title}</h3>
                                <p>{parseInt(String(videoData.duration / 60))}m {videoData.duration % 60 +1}s</p>
                                <p>{data.rating}/5 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {data.lessons.length} lessons</p>
                                <p>{data.description}</p>
                                <div className={styles['skill-list']}>
                                    {data.meta?.skills.map((skill, index) => (
                                        <div className={styles['skill']}>
                                            <p>{skill}</p>
                                        </div>
                                    ))

                                    }
                                </div>

                            </div>
                            <div className={styles['videos-list']}>
                                <h3>{data.title}</h3>
                                {data.lessons.map((lesson, index) => (
                                    <MiniVideoCard
                                        key={index}
                                        number={lesson.order}
                                        text={lesson.title}
                                        disabled={
                                            lesson.status != 'unlocked'}
                                        onClick={() => {
                                            setVideoData(lesson)
                                        }}

                                    />
                                ))

                                }
                            </div>
                        </div>) :
                        (
                            <div className={styles['loader-wrapper']}>
                                <div className={styles['loader']}>
                                    <Loader></Loader>
                                </div>
                            </div>


                        )
                }


            </div>

        );
    }

};

export default CoursePage;
