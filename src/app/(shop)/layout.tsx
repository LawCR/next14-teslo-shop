import { Footer, Sidebar, TopMenu } from "@/features/ui";

export default function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background dark:bg-dbackground text-text dark:text-dtext flex flex-col">
      <TopMenu />
      <Sidebar />
      <div className="flex-1 h-full px-0 md:px-10">
        { children }
      </div>
      <Footer />
    </main>
  );
}