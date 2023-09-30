import fs from "node:fs";
import path from "node:path";

import type { DirectoryTree } from "./types";
import { removeCwdFromPath } from "./utils";

const FOLDER_NAME = ".next-types";
const FILE_NAME = "$types.txt";
const root = path.join(process.cwd(), FOLDER_NAME);

function generateFilesRecursive(
  rootAppDir: string,
  tree: DirectoryTree,
  pathSoFar: string[],
  getFileContent: (dirNames: string[]) => string,
) {
  for (const item of tree) {
    const newPath = [...pathSoFar, item.name];
    const fullPath = path.join(rootAppDir, ...newPath);
    fs.mkdirSync(fullPath, { recursive: true });
    fs.writeFileSync(path.join(fullPath, FILE_NAME), getFileContent(newPath));
    generateFilesRecursive(rootAppDir, item.children, newPath, getFileContent);
  }
}

export function generateFiles(
  appDir: string,
  tree: DirectoryTree,
  getFileContent: (dirNames: string[]) => string,
) {
  const rootAppDir = path.join(root, removeCwdFromPath(appDir));
  fs.mkdirSync(rootAppDir, { recursive: true });
  generateFilesRecursive(rootAppDir, tree, [], getFileContent);
}
