// infor: https://better-auth.com/docs/installation#create-a-better-auth-instance


import { createKyselyAdapter } from '@better-auth/kysely-adapter';

import { betterAuth } from "better-auth";
import { Kysely } from 'kysely';
import { D1Dialect } from 'kysely-d1';

export function getAuth(env: { DB: D1Database; BETTER_AUTH_SECRET?: string }) {
    const db = new Kysely({
        dialect: new D1Dialect({
            database: env.DB,
        }),
    });

    return betterAuth({
        database: {
            db,
            type: "sqlite",
        },
        emailAndPassword: {
            enabled: true,
        },
        secret: env.BETTER_AUTH_SECRET,
    });
}

// for better-auth migrations (not for production) create in-mem db:
// import Database from 'better-sqlite3';

// export const auth = betterAuth({
//     database: new Database(":memory:"),
//     emailAndPassword: { enabled: true },
// });