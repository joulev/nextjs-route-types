import type { PageProps } from "./$types";

export default function Page({ params }: PageProps) {
  return <div className="text-red-500">{params.dynamic1}</div>;
}
