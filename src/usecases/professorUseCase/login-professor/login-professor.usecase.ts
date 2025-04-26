import { Professor } from "../../../domain/professor/entity/professor";
import { ProfessorGateway } from "../../../domain/professor/gateway/professor.gateway";
import { Usecase } from "../../usecase"

// DADOS DE ENTRADA
export type loginProfessorInputDto = {
    email: string;
    senha: string;
}

// DADOS DE SAÍDA
export type loginProfessorOutputDto = {
    nome: string;
    email: string;
}

export class loginProfessorUsecase 
    implements Usecase<loginProfessorInputDto, loginProfessorOutputDto> {

        private constructor(private readonly professorGateway: ProfessorGateway) {}

        public static create(professorGateway: ProfessorGateway) {
            return new loginProfessorUsecase(professorGateway);
        }

        public async execute ({
            email, 
            senha,
        }: loginProfessorInputDto): Promise<loginProfessorOutputDto> {

            const professor = await this.professorGateway.find_by_email(email);

            console.log(email)
            console.log(professor)

            if (!professor) {
                throw new Error("Professor não encontrado");
            }

            const senhaValida = professor.senha === senha;

            console.log(professor)

            if (!senhaValida) {
                throw new Error("Senha inválida");
            }

            return this.presentOutput(professor);

        } 
        
        private presentOutput(professor: Professor): loginProfessorOutputDto {
            return {
                nome: professor.nome,
                email: professor.email,
        };
    }
}