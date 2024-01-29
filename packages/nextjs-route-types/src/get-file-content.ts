import type { DirectoryTree, GetFileContent } from "./types";

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

function getParallelRoutesFromChildren(children: DirectoryTree) {
  const parallelRoutes = children
    .filter(child => child.name.startsWith("@"))
    .map(child => child.name.slice(1));
  if (!parallelRoutes.includes("children")) parallelRoutes.push("children");
  return parallelRoutes;
}

export const getFileContent: GetFileContent = (path, children) => {
  const params = getDynamicParamsFromPath(path);
  const paramsTsInterfaceContent = params
    .map(([type, name]) => `  "${name}": ${getTsTypeFromPathSegmentType(type)}`)
    .join(";\n")
    .trim();
  const parallelRoutes = getParallelRoutesFromChildren(children);
  const layoutPropsTsInterfaceContent = parallelRoutes
    .map(route => `  "${route}": ReactNode`)
    .concat("  params: Params")
    .join(";\n")
    .trim();
  return `
import type { NextRequest } from "next/server";
import type { ReactNode } from "react";

type EmptyObject = Record<string, never>;

export type SearchParams = Record<string, string | string[] | undefined>;
export type Params = ${params.length ? `{\n  ${paramsTsInterfaceContent};\n}` : "EmptyObject"};

export type DefaultProps = EmptyObject;
export type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
export type LayoutProps = {\n  ${layoutPropsTsInterfaceContent};\n};
export type LoadingProps = EmptyObject;
export type NotFoundProps = EmptyObject;
export type PageProps = {
  params: Params;
  searchParams: SearchParams;
};
export type TemplateProps = LayoutProps;

export type RouteHandlerContext = {
  params: Params;
};
type HandlerReturn = Response | Promise<Response>;
export type RouteHandler = (request: NextRequest, context: RouteHandlerContext) => HandlerReturn;
`.trimStart();
};
