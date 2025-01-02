### NestJS template

This application is template for NestJS full stack application. Template includes NestJS backend with knex.js as database library. PostgreSQL database hosted in docker container.  

Prerqusites:
- knex.js (installed globally)
- nestjs/cli (installed globally)
- .env file with database password `DB_PASSWORD=...` (others settings are optinoal, see: configuration.ts)
- .env file with JWT secret `JWT_SECRET=...` (others settings are optinoal, see: configuration.ts)

Architecure:
- Example assumes that projest will be kept in monorepo with frontend aplication (it uses npm workspaces to mantain monorepo)
- `lib` directory types that will be shared between backend and frontend, it also contains interfaces that are data contracts between backend and frontend.

Todo:
- add data seed with default user
- fix tests and add sample