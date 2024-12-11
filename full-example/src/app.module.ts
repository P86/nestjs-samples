import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NotFoundInterceptor } from './common/not-found.interceptor';
import { AuthModule } from './auth/auth.module';
import { KnexModule } from 'nest-knexjs';
import * as path from 'path';

function convertToCamelStr(str: string) {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (ltr) => ltr.toUpperCase())
    .replace(/[^a-zA-Z]/g, '')
}

function convertToCamel(obj: Object) {
  if (!obj) {
    return obj;
  }

  Object.keys(obj)?.forEach((key) => {
    if (typeof obj[key] === "object") {
      convertToCamel(obj[key]);
    }

    //todo: handle arrays

    const value = obj[key];
    delete obj[key];
    obj[convertToCamelStr(key)] = value;
  });
  return obj;
}

function convertCamelToSnake(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1_').toLowerCase()
}

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
        },
        postProcessResponse: (result, queryContext) => {
          // handle special case of raw results
          if (!result || result.hasOwnProperty('RowCtor')) {
            return result;
          }

          if (Array.isArray(result)) {
            return result.map((row) => convertToCamel(row));
          } else {
            return convertToCamel(result);
          }
        },
        wrapIdentifier: (value, origImpl, queryContext) =>
          origImpl(convertCamelToSnake(value)),
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
