import fs from "node:fs/promises";
import path from "node:path";

import { NextJSRouteTypesError } from "./error";

async function directoryExists(dir: string) {
  try {
    const stat = await fs.lstat(dir);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

export async function getAppDirectory() {
  let appDir = path.join(process.cwd(), "app");
  if (await directoryExists(appDir)) return appDir;
  appDir = path.join(process.cwd(), "src", "app");
  if (await directoryExists(appDir)) return appDir;
  throw new NextJSRouteTypesError("Could not find app directory");
}

export function removeCwdFromPath(str: string) {
  const cwd = process.cwd();
  if (str.startsWith(cwd)) return str.slice(cwd.length + 1);
  return str;
}
