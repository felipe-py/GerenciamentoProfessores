export type ProfessorProps = {
    id: string;
    cpf: string;
    nome: string;
    email: string;
    senha: string;
}


export class Professor {

    private constructor(private props: ProfessorProps) {}

    public static create(cpf: string, nome: string, email: string, senha: string) {
        return new Professor({
            id: crypto.randomUUID.toString(),
            cpf,
            nome,              // CRIPTOGRAFAR CPF, EMAIL, SENHA
            email, 
            senha,
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