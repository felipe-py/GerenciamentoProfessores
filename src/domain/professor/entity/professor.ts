import bcrypt from "bcrypt";

export type ProfessorProps = {
    id: string;
    cpf: string;
    nome: string;
    email: string;
    senha: string;
}


export class Professor {

    private constructor(private props: ProfessorProps) {}

    public static async create(cpf: string, nome: string, email: string, senha: string) {
       
        this.validadeCpf(cpf);
        this.validadeNome(nome);
        this.validadeEmail(email);
        this.validadeSenha(senha);

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

    private static validadeCpf(cpf: string) : void {
        if (!cpf) {
            throw new Error("CPF não pode ser vazio");
        }

        if (cpf.length !== 11) {
            throw new Error("CPF deve ter 11 dígitos");
        }

        if (!/^\d+$/.test(cpf)) {
            throw new Error("CPF deve conter apenas números");
        }
    }

    private static validadeNome(nome: string) : void {
        if (!nome) {
            throw new Error("Nome não pode ser vazio");
        }

        if (nome.length < 3) {
            throw new Error("Nome deve ter pelo menos 3 caracteres");
        }

        if (!/^[a-zA-Z\s]+$/.test(nome)) {
            throw new Error("Nome deve conter apenas letras e espaços");
        }
    }

    private static validadeEmail(email: string) : void {
        if (!email) {
            throw new Error("Email não pode ser vazio");
        }

        if (email.length < 5) {
            throw new Error("Email deve ter pelo menos 5 caracteres");
        }
    }

    private static validadeSenha(senha: string) : void {
        if (!senha) {
            throw new Error("Senha não pode ser vazia");
        }

        if (senha.length !== 4) {
            throw new Error("Senha deve ter 4 caracteres");
        }
    }


}