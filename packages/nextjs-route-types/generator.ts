import fs from "node:fs";
import path from "node:path";

const CWD = process.cwd();
const APP_DIR = path.join(CWD, "app");

const WATCHED_FILES = ["page.tsx", "layout.tsx", "route.ts"];

type TreeItem =
  | { type: "file"; name: keyof typeof WATCHED_FILES }
  | { type: "dir"; name: string; children: TreeItem[] };
type Tree = TreeItem[];

export function getTree(): Tree {
  function readDir(dir: string): TreeItem[] {
    return fs
      .readdirSync(dir)
      .map(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          return { type: "dir", name: file, children: readDir(fullPath) };
        } else if (WATCHED_FILES.includes(file)) {
          return { type: "file", name: file as keyof typeof WATCHED_FILES };
        }

        return null;
      })
      .filter(Boolean) as TreeItem[];
  }

  return readDir(APP_DIR);
}
