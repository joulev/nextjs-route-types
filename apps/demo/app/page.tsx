import { expectType } from "ts-expect";

import type { PageProps } from "./$types";

export default function Page({ params }: PageProps) {
  expectType<Record<string, never>>(params);
  return <div>Hello world</div>;
}
