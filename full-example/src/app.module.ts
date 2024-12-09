import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NotFoundInterceptor } from './common/not-found.interceptor';
import { AuthModule } from './auth/auth.module';
import { KnexModule } from 'nest-knexjs';
import * as path from 'path';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    KnexModule.forRoot({
      config: {
        client: 'pg',
        useNullAsDefault: true,
        connection: {
          host: '127.0.0.1',
          user: 'root',
          password: 'password',
          database: 'default',
          port: 5432,
          pool: { min: 1, max: 7 },
        },
        migrations: {
          tableName: 'knex_migrations',
          directory: path.join(__dirname, '../migrations'),
        }
        // postProcessResponse: (result, queryContext) => {
        //   // TODO: add special case for raw results
        //   if (Array.isArray(result)) {
        //     return result.map((row) => convertToCamel(row));
        //   } else {
        //     return convertToCamel(result);
        //   }
        // },
        //rapIdentifier: //todo convert to snake
      },
    }),],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: NotFoundInterceptor,
    },
  ],
})
export class AppModule { }
