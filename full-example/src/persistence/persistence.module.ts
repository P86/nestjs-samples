import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import * as path from 'path';

//todo: make convert functions more performant
function convertToCamel(str: string) {
    return str
        .toLowerCase()
        .replace(/([-_][a-z])/g, (ltr) => ltr.toUpperCase())
        .replace(/[^a-zA-Z]/g, '')
}

function convertCamelToSnake(str) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1_').toLowerCase()
}

function convertKeysToCamel(obj: Object) {
    if (!obj) {
        return obj;
    }

    Object.keys(obj)?.forEach((key) => {
        if (typeof obj[key] === "object") {
            convertKeysToCamel(obj[key]);
        }

        //todo: handle arrays

        const value = obj[key];
        delete obj[key];
        obj[convertToCamel(key)] = value;
    });
    return obj;
}

@Module({
    imports: [
        KnexModule.forRoot({
            //todo: read from .env
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
                    const isSpecialResult = result?.hasOwnProperty('RowCtor');
                    if (!result || isSpecialResult) {
                        return result;
                    }

                    if (Array.isArray(result)) {
                        return result.map((row) => convertKeysToCamel(row));
                    } else {
                        return convertKeysToCamel(result);
                    }
                },
                wrapIdentifier: (value, origImpl, queryContext) =>
                    origImpl(convertCamelToSnake(value)),
            },
        }),
    ]

})
export class PersistenceModule { }
