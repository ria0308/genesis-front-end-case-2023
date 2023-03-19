import React from "react";
import {useRouter} from "next/router";
import styles from "@/components/pages/courses-page/course-card/CourseCard.module.scss";
export interface CourseCardProps extends React.ComponentPropsWithoutRef<'button'>{
    id?: string;
    title?: string;
    tags?: string[];
    launchDate?: string;
    status?: string;
    description?: string;
    duration?: number;
    lessonsCount: number;
    containsLockedLessons: boolean;
    previewImageLink?: string;
    rating?: number;
    metaSlug?: string;
    metaSkills?: string [];
    metaCourseVideoPreviewLink: string;
    metaCourseVideoPreviewDuration: number;
    metaCourseVideoPreviewImageLink: string;

}


const CourseCard: React.FC<CourseCardProps> = props => {
    const router = useRouter()
    return (
        <button className={styles['mini-card']} {...props}>
            <img src={props.previewImageLink + '/cover.webp'}></img>
            <h3 className={styles['text']}>{props.title}</h3>
            <p>{props.rating}/5 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {props.lessonsCount} lessons</p>
            <div className={styles['skill-list']}>
                {props.metaSkills?.map((skill, index) => (
                    <div className={styles['skill']}>
                        <p>{skill}</p>
                    </div>
                ))

                }
            </div>

        </button>
    );


};

export default CourseCard;