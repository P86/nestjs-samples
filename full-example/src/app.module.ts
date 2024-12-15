import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NotFoundInterceptor } from './common/not-found.interceptor';
import { AuthModule } from './auth/auth.module';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PersistenceModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: NotFoundInterceptor,
    },
  ],
})
export class AppModule { }
