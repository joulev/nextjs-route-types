import { add } from "nextjs-route-types";

export default function Page() {
  const a = add(1, 2);
  // eslint-disable-next-line no-console -- yoyo
  console.log(a);
  return <div className="text-red-500">Hello world</div>;
}
