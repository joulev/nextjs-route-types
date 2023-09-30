import type { LayoutProps } from "./$types";

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
