import { expectType } from "ts-expect";

import type { RouteHandler } from "./$types";

export const GET: RouteHandler = (request, { params }) => {
  expectType<Request>(request);
  expectType<{ dynamic: string }>(params);
  return new Response();
};
