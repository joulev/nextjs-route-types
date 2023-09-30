import fs from "node:fs";
import path from "node:path";

import { NextJSRouteTypesError } from "./error";

export function getAppDirectory() {
  let appDir = path.join(process.cwd(), "app");
  if (fs.existsSync(appDir) && fs.lstatSync(appDir).isDirectory()) return appDir;
  appDir = path.join(process.cwd(), "src", "app");
  if (fs.existsSync(appDir) && fs.lstatSync(appDir).isDirectory()) return appDir;
  throw new NextJSRouteTypesError("Could not find app directory");
}

export function removeCwdFromPath(str: string) {
  const cwd = process.cwd();
  if (str.startsWith(cwd)) return str.slice(cwd.length + 1);
  return str;
}
