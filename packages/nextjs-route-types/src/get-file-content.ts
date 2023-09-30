enum PathSegmentType {
  OptionalCatchAll = "OptionalCatchAll",
  CatchAll = "CatchAll",
  Dynamic = "Dynamic",
}

function getDynamicParamsFromPath(path: string[]): [PathSegmentType, string][] {
  return path
    .filter(segment => segment.startsWith("[") && segment.endsWith("]"))
    .map(segment => segment.slice(1, -1))
    .map(segment => {
      if (segment.startsWith("[..."))
        return [PathSegmentType.OptionalCatchAll, segment.slice(4, -1)];
      if (segment.startsWith("...")) return [PathSegmentType.CatchAll, segment.slice(3)];
      return [PathSegmentType.Dynamic, segment];
    });
}

function getTsTypeFromPathSegmentType(type: PathSegmentType) {
  switch (type) {
    case PathSegmentType.OptionalCatchAll:
      return "string[] | undefined";
    case PathSegmentType.CatchAll:
      return "string[]";
    case PathSegmentType.Dynamic:
      return "string";
  }
}

export function getFileContent(path: string[]) {
  const params = getDynamicParamsFromPath(path);
  const tsInterfaceContent = params
    .map(([type, name]) => `  ${name}: ${getTsTypeFromPathSegmentType(type)}`)
    .join(";\n")
    .trim();
  return `
import React from "react";

export type SearchParams = Record<string, string | string[] | undefined>;
export type Params = {
  ${tsInterfaceContent};
};
export type PageProps = {
  params: Params;
  searchParams: SearchParams;
};
export type LayoutProps = {
  children: React.ReactNode;
  pageProps: PageProps;
};
`.trimStart();
}
