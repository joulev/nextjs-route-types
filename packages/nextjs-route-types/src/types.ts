export interface DirectoryTreeItem {
  name: string;
  children: DirectoryTree;
}

export type DirectoryTree = DirectoryTreeItem[];
