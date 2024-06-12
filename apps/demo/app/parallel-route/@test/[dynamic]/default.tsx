import { expectType } from "ts-expect";

import type { DefaultProps } from "./$types";

export default function Default({ params }: DefaultProps) {
  expectType<{ dynamic: string }>(params);
  return <div>Hello world</div>;
}
