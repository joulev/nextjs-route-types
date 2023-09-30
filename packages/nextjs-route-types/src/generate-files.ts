import fs from "node:fs/promises";
import path from "node:path";

import type { DirectoryTree } from "./types";
import { removeCwdFromPath } from "./utils";

const FOLDER_NAME = ".next-types";
const FILE_NAME = "$types.txt";
const root = path.join(process.cwd(), FOLDER_NAME);

async function generateFilesRecursive(
  rootAppDir: string,
  tree: DirectoryTree,
  pathSoFar: string[],
  getFileContent: (dirNames: string[]) => string,
) {
  await Promise.all(
    tree.map(async item => {
      const newPath = [...pathSoFar, item.name];
      const fullPath = path.join(rootAppDir, ...newPath);
      await fs.mkdir(fullPath, { recursive: true });
      await fs.writeFile(path.join(fullPath, FILE_NAME), getFileContent(newPath));
      await generateFilesRecursive(rootAppDir, item.children, newPath, getFileContent);
    }),
  );
}

export async function generateFiles(
  appDir: string,
  tree: DirectoryTree,
  getFileContent: (dirNames: string[]) => string,
) {
  const rootAppDir = path.join(root, removeCwdFromPath(appDir));
  await fs.mkdir(root, { recursive: true });
  await generateFilesRecursive(rootAppDir, tree, [], getFileContent);
}
