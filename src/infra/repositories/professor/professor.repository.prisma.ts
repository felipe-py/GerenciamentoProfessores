import { Professor } from "../../../domain/professor/entity/professor";
import { ProfessorGateway } from "../../../domain/professor/gateway/professor.gateway";
import { PrismaClient } from "../../../generated/prisma";     // ATENÇAO AQUI, TALVEZ IMPORT ESTEJA INCOERENTE

export class ProfessorRepositoryPrisma implements ProfessorGateway {
    
    private constructor(private readonly prismaClient: PrismaClient) {} 

    public static create(prismaClient: PrismaClient) {
        return new ProfessorRepositoryPrisma(prismaClient);
    }
    
    public async save(professor: Professor): Promise<void> {
        const data = {
            id: professor.id,
            nome: professor.nome,
            email: professor.email,       // AQUI DENTRO OCORRE A CONVERSÃO DE ENTIDADE PARA MODELO PRISMA
            senha: professor.senha,
            cpf: professor.cpf,
        };

        await this.prismaClient.professor.create({
            data,
        });
    }
}