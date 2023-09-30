import { expectType } from "ts-expect";

import type { PageProps } from "./$types";

export default function Page({ params, searchParams }: PageProps) {
  expectType<{ dynamic: string }>(params);
  expectType<string | string[] | undefined>(searchParams.hello);
  return <div>Hello world</div>;
}
