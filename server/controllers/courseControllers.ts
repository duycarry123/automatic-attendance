import { Request, Response } from 'express'
import Course from "../models/courseModel";
import { RequestUser } from '../config/interface'

class CourseController {
    async createCourse(req: RequestUser, res: Response) {
        try {
            const { name, credits, yearStart, yearEnd, courseCode, semester } = req.body;

            const newCourse = new Course({
                name, semester, credits, yearStart, yearEnd, courseCode,
                teacher: req.user?._id
            })

            await newCourse.save();

            return res.json({
                msg: "Tạo khoá học thành công", newCourse: {
                    teacher: req.user,
                    ...newCourse._doc
                }
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

    async getCourses(req: Request, res: Response) {
        try {
            const courses = await Course.find({}).sort("-createdAt")
                .populate("teacher")
            return res.json({ courses, length: courses.length })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

export default new CourseController;