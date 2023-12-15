export interface DirectoryTreeItem {
  name: string;
  children: DirectoryTree;
}

export type DirectoryTree = DirectoryTreeItem[];

export type GetFileContent = (dirNames: string[], children: DirectoryTree) => string;
