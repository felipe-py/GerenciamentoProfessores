import { Request, Response } from "express";
import { loginProfessorUsecase } from "../../../../../usecases/professorUseCase/login-professor/login-professor.usecase";
import { HttpMethod, Route } from "../route";
import { JwtTokenService } from "../../../../token/jwt-token.service";

export type LoginProfessorResponseDto = {
    token: string;
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

            try {

                const { email, senha } = request.body;

                const input = {
                    email,
                    senha,
                };

                const output: LoginProfessorResponseDto = 
                    await this.loginProfessorService.execute(input);

                const responseBody = this.present(output);

                response.status(200).json(responseBody);
                console.log("Login realizado com sucesso! => Email: ", output.token);


            } catch (error) {

                const { statusCode, body } = this.presentError(error);

                response.status(statusCode).json({ body });
                console.error("Erro ao realizar login: ", body.message);

            }
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: LoginProfessorResponseDto): LoginProfessorResponseDto {
        return {
            token: input.token,
        };
    }

    private presentError( error: unknown): {statusCode: number, body: any} {
        if (error instanceof Error) {
            
            if (error.message === "Professor não encontrado") {
                return {
                    statusCode: 404,
                    body: { message: error.message },
                };

            } else if (error.message === "Senha inválida") {
                return {
                    statusCode: 401,
                    body: { message: error.message },
                };

            } 

            return {
                statusCode: 400,
                body: { message: error.message },
            };
        }

        return {
            statusCode: 500,
            body: { message: "Erro interno do servidor" },
        };
    }

}