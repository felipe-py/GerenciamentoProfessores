// INTERFACE DE SAÍDA DOS CARAS DO DOAMIN PARA O DB

import { Professor } from "../entity/professor";

export interface ProfessorGateway {
    save(professor: Professor): Promise<void>;
}
