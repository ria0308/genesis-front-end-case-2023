import {client} from "@/api/instance";
import {Course} from "@/api/Course";
import {Courses} from "@/api/Courses";

export class API {
    static async getCourse(courseId: string): Promise<Course> {
        const { data } = await client.get(`/core/preview-courses/${courseId}`);
        return data;
    }

    static async getCourses(): Promise<Courses>{
        const {data} = await client.get(`/core/preview-courses`);
        return data;
    }
}