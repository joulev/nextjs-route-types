import { expectType } from "ts-expect";

import type { PageProps } from "./$types";

export default async function Page({ params, searchParams }: PageProps) {
  expectType<{ dynamic: string }>(await params);
  expectType<string | string[] | undefined>((await searchParams).hello);
  return <div>Hello world</div>;
}
