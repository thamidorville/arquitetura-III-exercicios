// Implemente DTO no endpoint POST /courses:

// DTOs de entrada e saída
// schema de validação via zod
// refatoração do catch para conseguir enviar mensagens de erro do ZodError

// Essas definições permitem que você valide os dados de entrada recebidos na 
// função createCourse com base nas regras definidas no esquema.
import z from 'zod';

export interface CreateCourseInputDTO {
    id: string,
    name: string,
    lessons: number
}

export const CreateCourseInputSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    lessons: z.number().positive()
});

export interface EditCourseInputDTO {
    idToEdit: string,
    id?: string,
    name?: string,
    lessons?: number
}

export const EditCourseInputSchema = z.object({
    idToEdit: z.string(),
    id: z.string().optional(),
    name: z.string().min(2).optional(),
    lessons: z.number().positive().optional()
});

export interface DeleteCourseInputDTO {
    idToDelete: string,

}

export const DeleteCourseInputSchema = z.object({ //valida os dados de entradac antes de excluir um curso
    idToDelete: z.string()
});