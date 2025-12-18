import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  preload: true,
  display: "swap",
  variable: "--font-plus-jakarta-sans",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/konnektr.svg",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  // Read GTM ID from env var (must be NEXT_PUBLIC_*)
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html
      lang="en"
      className={plusJakartaSans.className}
      suppressHydrationWarning
    >
      {/* Only render GTM if ID is set */}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
