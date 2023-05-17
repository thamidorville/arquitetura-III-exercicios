import express from "express"
import { CourseController } from "../controller/CourseController";
import { CourseBusiness } from "../business/CourseBusiness";
import { CourseDatabase } from "../database/CourseDatabase";

export const courseRouter = express.Router()

const courseDatabase = new CourseDatabase();
const courseBusiness = new CourseBusiness(courseDatabase); // permite que o CourseBusiness acesse os métodos e recursos fornecidos pela classe CourseDatabase
const courseController = new CourseController(courseBusiness); //permite que o CourseController acesse os métodos e funcionalidades do CourseBusiness para lidar com as requisições relacionadas aos cursos.


courseRouter.get("/", courseController.getCourses)
courseRouter.post("/", courseController.createCourse)
courseRouter.put("/:id", courseController.editCourse)
courseRouter.delete("/:id", courseController.deleteCourse)
