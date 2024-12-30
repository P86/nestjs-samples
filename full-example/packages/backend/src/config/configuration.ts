export type DatabaseConfig = {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
}

export type AuthConfig = {
    secret: string;
    expiresIn: string;
}

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    auth: {
        secret: process.env.JWT_SECRET, //no default must be in .env file
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    } as AuthConfig,
    database: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        database: process.env.DB_NAME || 'default',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD, //no default must be in .env file
    } as DatabaseConfig
});