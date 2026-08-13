// infor: https://better-auth.com/docs/installation#create-a-better-auth-instance


import { createKyselyAdapter } from '@better-auth/kysely-adapter';

import { betterAuth } from "better-auth";
import { Kysely } from 'kysely';
import { D1Dialect } from 'kysely-d1';



export function getAuth(env: { DB_ASTRO_TUTORIAL: D1Database; BETTER_AUTH_SECRET?: string }) {
    const db = new Kysely({
        dialect: new D1Dialect({
            database: env.DB_ASTRO_TUTORIAL,
        }),
    });

    return betterAuth({
        database: {
            db,
            type: "sqlite",
        },
        baseURL: "http://localhost:4321",
        emailAndPassword: {
            enabled: true,
        },
        secret: env.BETTER_AUTH_SECRET,
    });
}

// for better-auth migrations (not for production) create in-mem db:
// npx wrangler d1 execute better-auth-db --local --file=src/migrations/00-betterauth.sql
// import Database from 'better-sqlite3';

// export const auth = betterAuth({
//     database: new Database(":memory:"),
//     emailAndPassword: { enabled: true },
// });