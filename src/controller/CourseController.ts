import { Request, Response } from "express"
import { CourseBusiness } from "../business/CourseBusiness"
import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
import { CreateCourseInputSchema, DeleteCourseInputSchema, EditCourseInputSchema } from "../dto/createCourse.dto";

export class CourseController {
  private courseBusiness: CourseBusiness;

constructor(courseBusiness: CourseBusiness){
  this.courseBusiness = courseBusiness
}
  public getCourses = async (req: Request, res: Response) => {
    try {
      const input = {
        q: req.query.q
      }

      // const courseBusiness = new CourseBusiness()
      const output = await this.courseBusiness.getCourses(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError || error instanceof ZodError) {
        res.status(400).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public createCourse = async (req: Request, res: Response) => {
    try {

      const input = {
        id: req.body.id,
        name: req.body.name,
        lessons: req.body.lessons
      }
        CreateCourseInputSchema.parse(input)  //Ao chamar CreateCourseInputSchema.parse(input), 
        //você está aplicando o esquema de validação ao objeto input e verificando se ele 
        //atende a todas as regras definidas. Caso contrário, o Zod lançará uma exceção 
        //com informações sobre os erros de validação encontrados.

      // const courseBusiness = new CourseBusiness()
      const output = await this.courseBusiness.createCourse(input)

      res.status(201).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public editCourse = async (req: Request, res: Response) => {
    try {

      const input = {
        idToEdit: req.params.id,
        id: req.body.id,
        name: req.body.name,
        lessons: req.body.lessons
      }
      EditCourseInputSchema.parse(input)

      // const courseBusiness = new CourseBusiness()
      const output = await this.courseBusiness.editCourse(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError || error instanceof ZodError) {
        res.status(400).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public deleteCourse = async (req: Request, res: Response) => {
    try {

      const input = {
        idToDelete: req.params.id
      }
      DeleteCourseInputSchema.parse(input) //validação do objeto input usando 
      //o schema DeleteCourseInputSchema através do método parse. 
      //Essa validação garante que o input esteja de acordo com as regras definidas no schema. 
      //Caso haja alguma violação dessas regras, o método parse lançará uma exceção ZodError

      // const courseBusiness = new CourseBusiness()
      const output = await this.courseBusiness.deleteCourse(input) //Esse método será responsável 
      //por realizar a lógica de negócio para deletar o curso com o id especificado.

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError || error instanceof ZodError) {
        res.status(400).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }
}