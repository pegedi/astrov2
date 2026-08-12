# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

**install wrangler, better-auth, kysely**
```sh
npm install -D wrangler
npx astro add cloudflare

npm install better-auth kysely kysely-d1
npm install -D @cloudflare/workers-types
```

```sh
# Create .env file in your project root (copy from .env.example if available)
# Add secrets:
BETTER_AUTH_URL="http://localhost:4321"
BETTER_AUTH_SECRET="your-strong-random-secret"
```

create or updtae /src/env.d.ts:

```typescript
/// <reference types="@cloudflare/workers-types" />
/// <reference types="astro/client" />
```

create or update tsconfig.json:
Update tsconfig.json
Add @cloudflare/workers-types to the types array inside compilerOptions in your tsconfig.json:
```JSON
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "types": ["@cloudflare/workers-types"]
  }
}
```

2. Client-Side Component Authentication
If you need to log in or sign up from your frontend Astro components or React/Svelte islands, you do not import auth.ts. Instead, create a separate client file (src/lib/auth-client.ts):

```typescript
// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
    baseURL: "http://localhost:4321", // or your production domain
});
``` 

## run migrations

