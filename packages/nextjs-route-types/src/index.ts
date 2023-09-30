import type { NextConfig } from "next";
import type { Configuration, WebpackPluginInstance } from "webpack";

import { generateFiles } from "./generate-files";
import { getDirectoryTree } from "./get-directory-tree";
import { getFileContent } from "./get-file-content";

type WebpackConfigContext = Parameters<NonNullable<NextConfig["webpack"]>>[1];

class NextJSRouteTypesPlugin implements WebpackPluginInstance {
  name = "NextJSRouteTypesPlugin";
  constructor(private readonly context: WebpackConfigContext) {}

  apply() {
    if (this.context.isServer) return;
    const tree = getDirectoryTree();
    generateFiles(tree, getFileContent);
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
