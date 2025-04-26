import { Request, Response } from "express";
import { createProfessorInputDto, createProfessorUsecase } from "../../../../../usecases/professorUseCase/create-professor/create-professor.usecase";
import { HttpMethod, Route } from "../route";

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

}