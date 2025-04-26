import { ApiExpress } from "./infra/api/express/api.express";
import { CreateProfessorRoute } from "./infra/api/express/routes/professor/create-professor.express.route";
import { LoginProfessorRoute } from "./infra/api/express/routes/professor/login-professor.express.route";
import { ProfessorRepositoryPrisma } from "./infra/repositories/professor/professor.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { createProfessorUsecase } from "./usecases/professorUseCase/create-professor/create-professor.usecase";
import { loginProfessorUsecase } from "./usecases/professorUseCase/login-professor/login-professor.usecase";

function main() {
    const aRepository = ProfessorRepositoryPrisma.create(prisma);

    const CreateProfessorUsecase = createProfessorUsecase.create(aRepository);
    const createRoute = CreateProfessorRoute.create(CreateProfessorUsecase);

    const LoginProfessorUsecase = loginProfessorUsecase.create(aRepository);
    const loginRoute = LoginProfessorRoute.create(LoginProfessorUsecase);

    const port = 8000;
    const api = ApiExpress.create([createRoute, loginRoute]);

    api.start(port);

}

main();