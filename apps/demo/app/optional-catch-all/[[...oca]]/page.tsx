import { expectType } from "ts-expect";

import type { PageProps } from "./$types";

export default function Page({ params }: PageProps) {
  expectType<{ oca: string[] | undefined }>(params);
  return <div>Hello world</div>;
}
