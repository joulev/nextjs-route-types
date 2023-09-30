import fs from "node:fs";
import path from "node:path";

import type { DirectoryTree, DirectoryTreeItem } from "./types";

function getAppDirectory() {
  // TODO: Handle `src/app` as well
  return path.join(process.cwd(), "app");
}

function getDirectoryTreeRecursive(dir: string): DirectoryTree {
  return fs
    .readdirSync(dir)
    .map(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (!stat.isDirectory()) return null;
      return { name: item, children: getDirectoryTreeRecursive(fullPath) };
    })
    .filter((item): item is DirectoryTreeItem => Boolean(item));
}

export function getDirectoryTree() {
  return getDirectoryTreeRecursive(getAppDirectory());
}
