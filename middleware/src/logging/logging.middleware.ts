import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger: Logger;

  constructor() {
    this.logger = new Logger(LoggingMiddleware.name);
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.verbose(`Start executing`);
    next();
    this.logger.verbose(`End executing`);
  }
}
