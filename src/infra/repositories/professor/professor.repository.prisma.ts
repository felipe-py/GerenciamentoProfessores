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
            cpf: professor.cpf,
            nome: professor.nome,       // AQUI DENTRO OCORRE A CONVERSÃO DE ENTIDADE PARA MODELO PRISMA
            email: professor.email,
            senha: professor.senha,
        };

        await this.prismaClient.professor.create({
            data,
        });
    }

    public async find_by_email(email: string): Promise<Professor | null> {    
        const professor_data = await this.prismaClient.professor.findUnique({
            where: { email },
        });

        console.log("ESTE LOG ESTA EM PROFESSOR REPOSITORY PRISMA: ", professor_data)

        if (!professor_data) {
            return null;
        }
        
        return  Professor.with({
            id: professor_data.id,
            cpf: professor_data.cpf,
            nome: professor_data.nome,    // AQUI FOI ALTERADO DE CREATE PARA WITH, POIS O PROFESSOR JÁ EXISTE NO DB
            email: professor_data.email,
            senha: professor_data.senha,
        });
    }
}