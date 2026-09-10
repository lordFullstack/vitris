import { BottomNav } from "@/components/shell/BottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-void">
      <div className="flex flex-1 flex-col pb-[104px]">{children}</div>
      <BottomNav />
    </div>
  );
}
