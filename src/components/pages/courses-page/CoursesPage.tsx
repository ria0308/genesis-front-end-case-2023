import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import styles from './CoursesPage.module.scss';
import {useQuery} from "react-query";
import {API} from "@/api/CourseApi";
import Loader from "@/components/ui/loader";
import CourseCard from "@/components/pages/courses-page/course-card";
import {CustomStarIcon} from "@/components/custom-svg/CustomStarIcon";
import {Pagination} from "@mui/material";



const CoursesPage = () => {


    const router = useRouter();
    const {isLoading, isError, data} = useQuery(
        ['courses'],
        () => API.getCourses(),
        {
            refetchOnWindowFocus: false,
            retry: false
        },
    );
    if (isError) {
        setTimeout(() => {
            void router.push('/');
        }, 3000);
    }

    const [paginate, setPaginate] = useState(
        0
    );
    useEffect(() => {
       data && data.courses.reverse();
    }, [data]);
    const handleChange = (event, page) => {
        const value = page*10 -10;
        setPaginate(value);
    };


    return (
        <div className={styles['page']}>
            <div className={styles['heading']}>
                <div className={styles['star']}><CustomStarIcon/></div>
                <p> COURSES 4 U </p>
                <div className={styles['star']}><CustomStarIcon/></div>


            </div>
            {!!data ? (<div className={styles['pagination']}>

                        <Pagination
                            count={Math.ceil(data?.courses.length / 10)}
                            onChange={handleChange}
                        />


                    <div className={styles['courses-list']}>
                        {data.courses.slice(paginate, Math.min((paginate + 11), data?.courses.length)).map((lesson, index) => (
                            <CourseCard
                                key={index}
                                title={lesson.title}
                                previewImageLink={lesson.previewImageLink}
                                lessonsCount={lesson.lessonsCount}
                                rating={lesson.rating}
                                metaSkills={lesson.meta?.skills}
                                onClick={() => {
                                    router.push(`/course?courseId=${lesson.id}`);
                                }}
                            />
                        ))

                        }
                    </div>
                </div>

            ) : (
                <div className={styles['loader-wrapper']}>
                    <div className={styles['loader']}>
                        <Loader></Loader>
                    </div>
                </div>


            )}

        </div>
    );

};

export default CoursesPage;

