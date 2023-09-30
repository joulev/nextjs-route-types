// @ts-check
import { withNextJSRouteTypes } from "nextjs-route-types";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withNextJSRouteTypes()(nextConfig);
