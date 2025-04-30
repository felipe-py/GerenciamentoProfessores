# Sistema de gerenciamento de professores (cadastro/login)

Este é um sistema backend para o gerenciamento simples de professores, com funcionalidades de **cadastro** e **login**.

---

## Tecnologias utilizadas

- **[Typescript](https://www.typescriptlang.org/)** - Linguagem utilizada no desenvolvimento do sistema.

- **[Node.js](https://nodejs.org/)** - Ambiente de execução.

- **[Express](https://expressjs.com/)** - Framework web utilizada para a comunicação.

- **[Prisma](https://www.prisma.io/)** - ORM usado para o banco de dados relacional **(MySQL)**.

- **[JWT (JsonWebToken)](https://github.com/auth0/node-jsonwebtoken)** - Utilizado para a geração dos tokens com o login.

- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Gerar hash para as senhas cadastradas.

- **[Zod](https://github.com/colinhacks/zod)** - Validação de schemas e dados.

## Arquitetura

Segue os princípios **S.O.L.I.D** e **Clean Architecture**, com separação em camadas:

- **Domínio**: Entidade pura.

- **Use Cases**: Lógica de negócio.

- **Gateways**: Interfaces relacionadas a persistência dos dados.

- **Infra**: Rotas, banco de dados e geração de token.

## Scripts disponibilizados

```bash
npm i # instala dependências necessárias
npm run dev # inicia o servidor em localhost:8000
