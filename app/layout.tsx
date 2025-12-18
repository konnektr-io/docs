import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { CookieConsent } from "@/components/cookie-consent";
import { GoogleTagManager } from "@next/third-parties/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  preload: true,
  display: "swap",
  variable: "--font-plus-jakarta-sans",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

// Helper to update GTM consent
function setConsent(consent: "accepted" | "declined") {
  if (typeof window !== "undefined") {
    // Declare window.gtag for TypeScript
    type GtagFn = (
      command: string,
      action: string,
      params: Record<string, string>
    ) => void;
    const gtag = (window as typeof window & { gtag?: GtagFn }).gtag;
    if (gtag) {
      if (consent === "accepted") {
        gtag("consent", "update", {
          ad_storage: "granted",
          analytics_storage: "granted",
        });
      } else {
        gtag("consent", "update", {
          ad_storage: "denied",
          analytics_storage: "denied",
        });
      }
    }
    type ClarityFn = (command: string, params: Record<string, string>) => void;
    const clarity = (window as typeof window & { clarity?: ClarityFn }).clarity;
    if (clarity) {
      if (consent === "accepted") {
        clarity("consentv2", {
          ad_Storage: "granted",
          analytics_Storage: "granted",
        });
      } else {
        clarity("consentv2", {
          ad_Storage: "denied",
          analytics_Storage: "denied",
        });
      }
    }
  }
}

export default function Layout({ children }: LayoutProps<"/">) {
  // Read GTM ID from env var (must be NEXT_PUBLIC_*)
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  // Accept/decline handlers for CookieConsent
  const handleAccept = () => setConsent("accepted");
  const handleDecline = () => setConsent("declined");

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
        {/* Cookie consent banner (client-side only) */}
        <CookieConsent
          variant="minimal"
          onAcceptCallback={handleAccept}
          onDeclineCallback={handleDecline}
        />
      </body>
    </html>
  );
}
