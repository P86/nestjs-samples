import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();

        return next.handle().pipe(
            tap((data) => {
                if (['GET', 'POST', 'PUT', 'PATH'].includes(request.method) && (data === null || data === undefined)) {
                    response.status(404).json({
                        statusCode: 404,
                        message: 'Resource not found',
                    });
                }
            }),
        );
    }
}
