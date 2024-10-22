import { expectType } from "ts-expect";

import type { RouteHandler } from "./$types";

export const GET: RouteHandler = async (request, { params }) => {
  expectType<Request>(request);
  expectType<{ dynamic: string }>(await params);
  return new Response();
};
