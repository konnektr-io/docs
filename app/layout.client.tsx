"use client";
import { CookieConsent } from "@/components/cookie-consent";
import { ReactNode, useEffect } from "react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/cn";

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

export function Body({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const mode = useMode();
  // Accept/decline handlers for CookieConsent
  const handleAccept = () => setConsent("accepted");
  const handleDecline = () => setConsent("declined");

  return (
    <body className={cn(mode, "relative flex min-h-screen flex-col")}>
      {children}
      <CookieConsent
        variant="minimal"
        onAcceptCallback={handleAccept}
        onDeclineCallback={handleDecline}
      />
    </body>
  );
}

export function useMode(): string | undefined {
  const { slug } = useParams();
  return Array.isArray(slug) && slug.length > 0 ? slug[0] : undefined;
}
