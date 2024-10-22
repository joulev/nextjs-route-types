import { expectType } from "ts-expect";

import type { PageProps } from "./$types";

export default async function Page({ params }: PageProps) {
  expectType<Record<string, never>>(await params);
  return <div>Hello world</div>;
}
