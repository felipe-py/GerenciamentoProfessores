import { Professor } from "../../../domain/professor/entity/professor";
import { ProfessorGateway } from "../../../domain/professor/gateway/professor.gateway";
import { Usecase  } from "../../usecase"

// DADOS DE ENTRADA DO CASO DE USO
export type createProfessorInputDto = {
    cpf: string;
    nome: string;
    email: string;
    senha: string;
}

// DADOS DE SAÍDA DO CASO DE USO
export type createProfessorOutputDto = {
    nome: string;
}

export class createProfessorUsecase 
    implements Usecase<createProfessorInputDto, createProfessorOutputDto> {

        private constructor(private readonly professorGateway: ProfessorGateway) {}

        public static create(professorGateway: ProfessorGateway) {
            return new createProfessorUsecase(professorGateway);
        }

        public async execute ({
            cpf,
            nome,
            email,
            senha,
        }: createProfessorInputDto): Promise<createProfessorOutputDto> {
            const aProfessor = Professor.create(cpf, nome, email, senha);

            await this.professorGateway.save(await aProfessor);

            const output = this.presentOutput(await aProfessor);
            return output; 
        }

        private presentOutput(professor: Professor): createProfessorOutputDto {
            const output: createProfessorOutputDto = {
                nome: professor.nome,
            }

            return output;

        }
    }

