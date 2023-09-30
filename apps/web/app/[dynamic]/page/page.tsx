import type { PagePath } from "./$types";

export default function Page() {
  const path: PagePath = "[dynamic]/page";
  return <div className="text-red-500">{path}</div>;
}
