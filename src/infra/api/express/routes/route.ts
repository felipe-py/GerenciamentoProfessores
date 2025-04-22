// CONTRATO

import { Request, Response } from "express";

export type HttpMethod = 'get' | 'post';
export const HttpMethod = {
    GET: 'get' as HttpMethod,
    POST: 'post' as HttpMethod,    // ISSO É TIPO CRIAR UM ENUM, CRIADO COMO CONSTANTE PARA QUE NÃO SEJA ALTERADO
} as const;

export interface Route {
    
    getHandler(): (request: Request, response: Response) => Promise<void>;
    getPath(): string;
    getMethod(): HttpMethod;
    
}