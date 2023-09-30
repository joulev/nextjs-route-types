import { watch } from "chokidar";
import type { NextConfig } from "next";
import type { Configuration, WebpackPluginInstance } from "webpack";

import { NextJSRouteTypesError } from "./error";
import { generateFiles } from "./generate-files";
import { getDirectoryTree } from "./get-directory-tree";
import { getFileContent } from "./get-file-content";
import { getAppDirectory } from "./utils";

type WebpackConfigContext = Parameters<NonNullable<NextConfig["webpack"]>>[1];

// https://github.com/tatethurston/nextjs-routes/blob/5ac00a885e06aa89b8eab029288d32955d7df5a6/packages/nextjs-routes/src/config.ts#L14-L23
function debounce<Fn extends (...args: unknown[]) => unknown>(
  fn: Fn,
  ms: number,
): (...args: Parameters<Fn>) => void {
  let id: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), ms);
  };
}

class NextJSRouteTypesPlugin implements WebpackPluginInstance {
  name = "NextJSRouteTypesPlugin";
  constructor(private readonly context: WebpackConfigContext) {}

  async main(appDir: string) {
    const tree = await getDirectoryTree(appDir);
    await generateFiles(appDir, tree, getFileContent);
  }

  async apply() {
    if (this.context.isServer) return;
    try {
      const appDir = await getAppDirectory();
      if (this.context.dev) {
        const watcher = watch(appDir, { persistent: true });
        const generate = debounce(() => this.main(appDir), 50);
        watcher.on("add", generate).on("unlink", generate);
      } else {
        await this.main(appDir);
      }
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
