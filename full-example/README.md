### NestJS template

This application is template for NestJS full stack application. Template includes NestJS backend with knex.js as database library. PostgreSQL database hosted in docker container.  

Prerqusites:
- knex.js (installed globally)
- nestjs/cli (installed globally)
- .env file with database password `DB_PASSWORD=...` (others settings are optinoal, see: configuration.ts)
- .env file with JWT secret `JWT_SECRET=...` (others settings are optinoal, see: configuration.ts)

Todo:
- sample of unit tests
- sample of e2e tests
- add monorepo support (Turbo.js, and share dto code between bakcend and frontend)
- add react, frontend sample