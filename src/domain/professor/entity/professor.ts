import bcrypt from "bcrypt";
import { z } from "zod";
import crypto from "crypto";

export type ProfessorProps = {
    id: string;
    cpf: string;
    nome: string;
    email: string;
    senha: string;
}

const ProfessorSchema = z.object({
    cpf: z.string()
        .length(11, "CPF deve conter 11 dígitos")
        .regex(/^\d+$/, "CPF deve conter apenas números"),
    nome: z.string()
        .min(3, "Nome deve ter pelo menos 3 caracteres")
        .regex(/^[a-zA-Z\s]+$/, "Nome deve conter apenas letras e espaços"),
    email: z.string()
        .min(5, "Email deve ter pelo menos 5 caracteres"),
    senha: z.string()
        .min(4, "Senha deve ter no mínimo 4 caracteres")    
});

export class Professor {

    private constructor(private props: ProfessorProps) {}

    public static async create(cpf: string, nome: string, email: string, senha: string) {
       
        ProfessorSchema.parse({ cpf, nome, email, senha }); // Validação dos dados de entrada usando Zod

        const senhaHash = await bcrypt.hash(senha, 10); 

        return new Professor({
            id: crypto.randomUUID().toString(),
            cpf,
            nome,              
            email, 
            senha: senhaHash
        });
    }

    public static with(props: ProfessorProps) {
        return new Professor(props);     // USADO QUANDO UM PROFESSOR JÁ ESTA CADASTRADO E QUEREMOS RECUPERALO DO DB
    }

    public get id() {
        return this.props.id;
    }

    public get cpf() {
        return this.props.cpf;
    }

    public get nome() {
        return this.props.nome;
    }

    public get email() {
        return this.props.email;
    }

    public get senha() {
        return this.props.senha;
    }

}