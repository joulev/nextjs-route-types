import { expectType } from "ts-expect";

import type { PageProps } from "./$types";

export default function Page({ params }: PageProps) {
  expectType<{ catchall: string[] }>(params);
  return <div>Hello world</div>;
}
