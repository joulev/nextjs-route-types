export function getFileContent(dirNames: string[]) {
  return `
export type PageParams = Record<string, string | string[] | undefined>;
export type PagePath = "${dirNames.join("/")}";
`;
}
