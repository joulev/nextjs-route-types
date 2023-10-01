import { expectType } from "ts-expect";

import type { PageProps } from "./$types";

export default function Page({ params }: PageProps) {
  expectType<string>(params["special-char"]);
  return <div>Hello world</div>;
}
