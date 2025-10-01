import type { ReactNode } from "react";
import HomeHeader from "./HomeHeader";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <HomeHeader />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
