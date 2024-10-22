# nextjs-route-types

Automatic type generation for Next.js app router routes, ~~copied from~~ highly inspired by [SvelteKit](https://kit.svelte.dev).

<img width="660" alt="Screenshot of nextjs-route-types in action" src="https://github.com/user-attachments/assets/4c4104d3-1c04-45dd-9eb3-256327191b60">

**Version 2 only supports Next.js 15 and after. If you want to continue using Next.js 13 or 14, use version 1.1.1 of this library.**

## Installation

1. Install the package from NPM:

   ```sh
   npm install nextjs-route-types # npm
   yarn add nextjs-route-types # yarn
   pnpm add nextjs-route-types # pnpm
   bun add nextjs-route-types # bun
   ```

2. Use the Next.js plugin in your Next.js config file

   ```js
   const { withNextJSRouteTypes } = require("nextjs-route-types");

   /** @type {import("next").NextConfig} */
   const nextConfig = {
     // your Next.js configurations
   };

   module.exports = withNextJSRouteTypes(nextConfig);
   ```

3. Configure `tsconfig.json`: Add `"rootDirs": [".", ".next-types"]` to your `compilerOptions`. This step is necessary, we need this for TypeScript to know where to look when we import from `./$types`.

4. If you use Git you might want to add `.next-types` to `.gitignore`.

## Usage

In any files inside the `app` directory (or `src/app` if you use it), you can import certain types from `"./$types"`:

```tsx
// app/[dynamic]/[nested]/page.tsx
import type { PageProps } from "./$types";

export default async function Page({ params }: PageProps) {
  console.log((await params).dynamic); // string
  return <div>Hello world</div>;
}
```

```tsx
// app/[dynamic]/[...another]/route.ts
import type { RouteHandler } from "./$types";

export const GET: RouteHandler = async (request, { params }) => {
  console.log((await params).another); // string[];
  return new Response();
};
```

`./$types` exports the following types: `SearchParams`, `Params`, `DefaultProps`, `ErrorProps`, `LayoutProps`, `LoadingProps`, `NotFoundProps`, `PageProps`, `TemplateProps`, `RouteHandlerContext` and `RouteHandler`.

> **Note**
> Editor IntelliSense might not work and you likely have to type that import statement manually. This is a known issue that I don't know how to fix – PRs welcome.

## Credits

[SvelteKit](https://kit.svelte.dev) for the idea of using `rootDirs` for this.

[`nextjs-routes`](https://github.com/tatethurston/nextjs-routes) on which the Next.js plugin part of this code is based.
