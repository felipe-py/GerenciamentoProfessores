import { TokenService } from "../../../core/token/token-service.interface";
import { Professor } from "../../../domain/professor/entity/professor";
import { ProfessorGateway } from "../../../domain/professor/gateway/professor.gateway";
import { Usecase } from "../../usecase"
import bcrypt from "bcrypt";

// DADOS DE ENTRADA
export type loginProfessorInputDto = {
    email: string;
    senha: string;
}

// DADOS DE SAÍDA
export type loginProfessorOutputDto = {
    token: string;
}

export class loginProfessorUsecase 
    implements Usecase<loginProfessorInputDto, loginProfessorOutputDto> {

        private constructor(
            private readonly professorGateway: ProfessorGateway,
            private readonly tokenService: TokenService,
        ) {}

        public static create(
            professorGateway: ProfessorGateway,
            tokenService: TokenService,
         ) {
            return new loginProfessorUsecase(professorGateway, tokenService);
        }

        public async execute ({
            email, 
            senha,
        }: loginProfessorInputDto): Promise<loginProfessorOutputDto> {

            const professor = await this.professorGateway.find_by_email(email);

            console.log(professor)

            if (!professor) {
                throw new Error("Professor não encontrado");
            }

            const senhaValida = await bcrypt.compare(senha, professor.senha); 

            if (!senhaValida) {
                throw new Error("Senha inválida");
            }

            return this.presentOutput(professor);

        } 
        
        private presentOutput(professor: Professor): loginProfessorOutputDto {

            const payload = {
                id: professor.id,
                email: professor.email,
                nome: professor.nome,
            }

            const token = this.tokenService.generateToken(payload);

            return { token } 
    }
}