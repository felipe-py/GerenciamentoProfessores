import { Request, Response } from "express";
import { createProfessorInputDto, createProfessorUsecase } from "../../../../../usecases/professorUseCase/create-professor/create-professor.usecase";
import { HttpMethod, Route } from "../route";
import { ZodError } from "zod";

export type CreateProfessorResponseDto = {
    nome: string;
};


export class CreateProfessorRoute implements Route {

    private constructor (
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createProfessorService: createProfessorUsecase
    ) {}

    public static create (createProfessorService: createProfessorUsecase): CreateProfessorRoute {
        return new CreateProfessorRoute(
            "/cadastro",
            HttpMethod.POST,
            createProfessorService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {

            try {

                const { cpf, nome, email, senha} = request.body;

                const input: createProfessorInputDto = {
                    cpf, 
                    nome,
                    email,
                    senha,
                };

                const output: CreateProfessorResponseDto = 
                    await this.createProfessorService.execute(input);

                const responseBody = this.present(output);

                response.status(201).json(responseBody);

                console.log("Professor cadastrado com sucesso!");
                console.table({ Nome: nome, Email: email, CPF: cpf });

            } catch (error) {

                const { statusCode, body } = this.presentError(error);

                response.status(statusCode).json(body);

                console.error("Erro ao cadastrar professor:", body
                    
                );
            }
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: CreateProfessorResponseDto): CreateProfessorResponseDto {
        const response = {
            nome: input.nome,
        }
        return response;
    }

    private presentError(error: unknown): { statusCode: number, body: any } {
        if (error instanceof ZodError) {
            return {
                statusCode: 400,
                body: {
                    message: "Erro de validação dos dados enviados.",
                    errors: error.errors.map(err => ({
                        field: err.path.join("."),
                        message: err.message,
                    })),
                },
            };
        }
    
        return {
            statusCode: 500,
            body: {
                message: "Erro interno no servidor.",
            },
        };
    }
    

}