import fs from "node:fs/promises";
import path from "node:path";

import type { DirectoryTree, GetFileContent } from "./types";
import { removeCwdFromPath } from "./utils";

const FOLDER_NAME = ".next-types";
const FILE_NAME = "$types.ts";
const root = path.join(process.cwd(), FOLDER_NAME);

async function generateFilesRecursive(
  rootAppDir: string,
  tree: DirectoryTree,
  pathSoFar: string[],
  getFileContent: GetFileContent,
) {
  await Promise.all(
    tree.map(async item => {
      const newPath = [...pathSoFar, item.name];
      const fullPath = path.join(rootAppDir, ...newPath);
      await fs.mkdir(fullPath, { recursive: true });
      await fs.writeFile(path.join(fullPath, FILE_NAME), getFileContent(newPath, item.children));
      await generateFilesRecursive(rootAppDir, item.children, newPath, getFileContent);
    }),
  );
}

export async function generateFiles(
  appDir: string,
  tree: DirectoryTree,
  getFileContent: GetFileContent,
) {
  const rootAppDir = path.join(root, removeCwdFromPath(appDir));
  await fs.mkdir(rootAppDir, { recursive: true });
  await fs.writeFile(path.join(rootAppDir, FILE_NAME), getFileContent([], tree));
  await generateFilesRecursive(rootAppDir, tree, [], getFileContent);
}
