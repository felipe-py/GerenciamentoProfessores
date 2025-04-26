import { Request, Response } from "express";
import { loginProfessorUsecase } from "../../../../../usecases/professorUseCase/login-professor/login-professor.usecase";
import { HttpMethod, Route } from "../route";

export type LoginProfessorResponseDto = {
    nome: string;
    email: string;
}

export class LoginProfessorRoute implements Route {

    private constructor (
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly loginProfessorService: loginProfessorUsecase
    ) {}

    public static create (loginProfessorService: loginProfessorUsecase): LoginProfessorRoute {
        return new LoginProfessorRoute(
            "/login",
            HttpMethod.POST,
            loginProfessorService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { email, senha } = request.body;

            const input = {
                email,
                senha,
            };

            const output: LoginProfessorResponseDto = 
                await this.loginProfessorService.execute(input);

            const responseBody = this.present(output);

            response.status(200).json(responseBody);

        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: LoginProfessorResponseDto): LoginProfessorResponseDto {
        const response = {
            nome: input.nome,
            email: input.email,
        }
        return response;
    }

}