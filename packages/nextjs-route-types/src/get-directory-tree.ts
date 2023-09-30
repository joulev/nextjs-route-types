import fs from "node:fs/promises";
import path from "node:path";

import type { DirectoryTree, DirectoryTreeItem } from "./types";

async function getDirectoryTreeRecursive(dir: string): Promise<DirectoryTree> {
  const directory = await fs.readdir(dir, { withFileTypes: true });
  const tree = await Promise.all(
    directory.map(async item => {
      if (!item.isDirectory()) return null;
      return {
        name: item.name,
        children: await getDirectoryTreeRecursive(path.join(dir, item.name)),
      };
    }),
  );
  return tree.filter((item): item is DirectoryTreeItem => Boolean(item));
}

export function getDirectoryTree(appDir: string) {
  return getDirectoryTreeRecursive(appDir);
}
