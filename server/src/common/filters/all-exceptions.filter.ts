import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';
import { IBaseErrorResponse } from "../interfaces/base-error-response.interface";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

//пожуать лучше над ошибками призмы. приходят общие исправления без указки на поле которое нужно исправить 

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        
        let baseError: IBaseErrorResponse = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: req.url,
            method: req.method
        }

        if (exception instanceof HttpException) {
            baseError = this.handleHttpException(exception, baseError);
        }

        
        else if (exception instanceof PrismaClientKnownRequestError) {
            baseError = this.handlePrismaKnownRequestError(exception, baseError);        
        }


        res.status(baseError.statusCode).json({
            success: false,
            error: baseError
        });  
    }


    handlePrismaKnownRequestError(exception: PrismaClientKnownRequestError, errorResponse: IBaseErrorResponse): IBaseErrorResponse  {
        const code = exception.code;
        const meta = exception.meta;
        const message = exception.message.split(/\r?\n/).at(-1);

        switch(code) {
            case 'P2002':
                errorResponse.statusCode = 409;
                if (meta) {
                    const fields = meta.target ? meta.target as string[]: []; //внести проверку таргета точно ли это массив строк
                    if (fields.length > 0) {
                        errorResponse.field = fields;
                    }                 
                } 
                errorResponse.message = 
                (errorResponse.path == '/caegories' && errorResponse.method == 'POST')
                ? {ru: 'Такая категория уже существует', en: message}
                : message;       
                break;

            case 'P2003':
                errorResponse.statusCode = 400;
                errorResponse.message = message;
                break;
            
            case 'P2025':
                errorResponse.statusCode = 404;
                errorResponse.message = message;
                break; 
            default:
                errorResponse.statusCode = 500;
                errorResponse.message = message;
                break;
        }   
        
        return errorResponse;

    }


    handleHttpException(exception: HttpException, errorResponse: IBaseErrorResponse): IBaseErrorResponse {
        const exRes = exception.getResponse();

        errorResponse.statusCode = exception.getStatus();

        if (exRes) {
            if (typeof exRes === 'object') {
                errorResponse = {...errorResponse, ...exRes};
            } else {
                errorResponse.message = exRes;
            }
        }         

        return errorResponse;
    }
}