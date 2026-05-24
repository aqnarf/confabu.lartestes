export default function AdminRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-muted/40">{children}</div>;
}
