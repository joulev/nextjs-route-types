import type { NextConfig } from "next";
import type { Configuration, WebpackPluginInstance } from "webpack";

type WebpackConfigContext = Parameters<NonNullable<NextConfig["webpack"]>>[1];

class NextJSRouteTypesPlugin implements WebpackPluginInstance {
  name = "NextJSRouteTypesPlugin";
  constructor(private readonly context: WebpackConfigContext) {}

  apply() {
    if (this.context.isServer) return;
    console.log(`Running for ${this.context.dev ? "dev" : "prod"} mode`);
  }
}

export function withNextJSRouteTypes(): (nextConfig: NextConfig) => NextConfig {
  return nextConfig => {
    return {
      ...nextConfig,
      webpack: (config: Configuration, context) => {
        config.plugins ??= [];
        config.plugins.push(new NextJSRouteTypesPlugin(context));

        // invoke any existing webpack extensions
        if (nextConfig.webpack) return nextConfig.webpack(config, context) as unknown;
        return config;
      },
    };
  };
}
