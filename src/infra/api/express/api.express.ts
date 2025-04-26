import express, { Express } from 'express';
import { Route } from './routes/route';
import { Api } from '../api';
import cors from 'cors'; 

export class ApiExpress implements Api {

    private app: Express;

    private constructor(routes: Route[]) {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors()); // Adicionando o middleware CORS para permitir requisições de qualquer origem
        this.addRoutes(routes);
    }

    public static create(routes: Route[]): ApiExpress{
        return new ApiExpress(routes);
    }

    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();

            console.log(`Adicionando rota: [${method.toUpperCase()}] ${path}`);   // GPT FEZ ISSO

            if (typeof this.app[method] !== "function") {
                console.error(`Método HTTP inválido: ${method}`);
            }

            this.app[method](path, handler);
        });
    }

    public start (port: number) {
        this.app.listen(port, () => {
            console.log(`API rodando na porta ${port}`);
            this.listRoutes();
        });
    }

    private listRoutes() {

        if (!this.app._router || !this.app._router.stack) {
            console.warn('Nenhuma rota registrada.');   // GPT FEZ ISSO
            return;
        }

        const routes = this.app._router.stack
            .filter((route: any) => route.route)
            .map((route: any) => {
                return {
                    path: route.route.path,
                    method: route.route.stack[0].method,
                };
            });
        
        console.log(routes);
    }
}