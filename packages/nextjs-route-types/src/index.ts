import type { NextConfig } from "next";
import type { Configuration, WebpackPluginInstance } from "webpack";

import { NextJSRouteTypesError } from "./error";
import { generateFiles } from "./generate-files";
import { getDirectoryTree } from "./get-directory-tree";
import { getFileContent } from "./get-file-content";
import { getAppDirectory } from "./utils";

type WebpackConfigContext = Parameters<NonNullable<NextConfig["webpack"]>>[1];

class NextJSRouteTypesPlugin implements WebpackPluginInstance {
  name = "NextJSRouteTypesPlugin";
  constructor(private readonly context: WebpackConfigContext) {}

  async apply() {
    if (this.context.isServer) return;
    try {
      const appDir = await getAppDirectory();
      const tree = await getDirectoryTree(appDir);
      await generateFiles(appDir, tree, getFileContent);
    } catch (e) {
      if (e instanceof NextJSRouteTypesError) {
        console.error(e.message);
        return;
      }
      throw e;
    }
  }
}

export function withNextJSRouteTypes(nextConfig: NextConfig): NextConfig {
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
}
