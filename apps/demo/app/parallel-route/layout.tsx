import { expectType } from "ts-expect";

import type { LayoutProps } from "./$types";

export default function Layout(props: LayoutProps) {
  expectType<{ test: React.ReactNode; children: React.ReactNode }>(props);
  return (
    <div>
      {props.test} {props.children}
    </div>
  );
}
