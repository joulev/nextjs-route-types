const OPTIONAL_CATCH_ALL = "optionalCatchAll";
const CATCH_ALL = "catchAll";
const DYNAMIC = "dynamic";
type PathSegmentType = typeof OPTIONAL_CATCH_ALL | typeof CATCH_ALL | typeof DYNAMIC;

function getDynamicParamsFromPath(path: string[]): [PathSegmentType, string][] {
  return path
    .filter(segment => segment.startsWith("[") && segment.endsWith("]"))
    .map(segment => segment.slice(1, -1))
    .map(segment => {
      // If [...slug], return slug
      if (segment.startsWith("[...")) return [OPTIONAL_CATCH_ALL, segment.slice(4, -1)];
      if (segment.startsWith("...")) return [CATCH_ALL, segment.slice(3)];
      return [DYNAMIC, segment];
    });
}

function getTsTypeFromPathSegmentType(type: PathSegmentType) {
  switch (type) {
    case OPTIONAL_CATCH_ALL:
      return "string[] | undefined";
    case CATCH_ALL:
      return "string[]";
    case DYNAMIC:
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
