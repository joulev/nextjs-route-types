import { expectType } from "ts-expect";

import type { PageProps } from "./$types";

export default async function Page({ params }: PageProps) {
  expectType<string>((await params)["special-char"]);
  return <div>Hello world</div>;
}
