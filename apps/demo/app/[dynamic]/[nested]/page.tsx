import { expectType } from "ts-expect";

import type { PageProps } from "./$types";

export default function Page({ params }: PageProps) {
  expectType<{ dynamic: string; nested: string }>(params);
  return <div>Hello world</div>;
}
