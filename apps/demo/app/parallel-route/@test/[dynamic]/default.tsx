import { expectType } from "ts-expect";

import type { DefaultProps } from "./$types";

export default async function Default({ params }: DefaultProps) {
  expectType<{ dynamic: string }>(await params);
  return <div>Hello world</div>;
}
