import fs from "node:fs";
import path from "node:path";

import type { DirectoryTree } from "./types";

const FOLDER_NAME = ".next-types";
const FILE_NAME = "$types.txt";
const root = path.join(process.cwd(), FOLDER_NAME);
// TODO: Handle src/app as well
const rootAppDir = path.join(root, "app");

function generateFilesRecursive(
  tree: DirectoryTree,
  pathSoFar: string[],
  getFileContent: (dirNames: string[]) => string,
) {
  for (const item of tree) {
    const newPath = [...pathSoFar, item.name];
    const fullPath = path.join(rootAppDir, ...newPath);
    fs.mkdirSync(fullPath, { recursive: true });
    fs.writeFileSync(path.join(fullPath, FILE_NAME), getFileContent(newPath));
    generateFilesRecursive(item.children, newPath, getFileContent);
  }
}

export function generateFiles(tree: DirectoryTree, getFileContent: (dirNames: string[]) => string) {
  fs.mkdirSync(root, { recursive: true });
  fs.mkdirSync(rootAppDir, { recursive: true });
  generateFilesRecursive(tree, [], getFileContent);
}
