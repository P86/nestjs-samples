export type DatabaseConfig = {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
}

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        database: process.env.DB_NAME || 'default',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD, //.env file
    } as DatabaseConfig
});