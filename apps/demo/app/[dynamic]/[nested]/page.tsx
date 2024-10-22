import { expectType } from "ts-expect";

import type { PageProps } from "./$types";

export default async function Page({ params }: PageProps) {
  expectType<{ dynamic: string; nested: string }>(await params);
  return <div>Hello world</div>;
}
