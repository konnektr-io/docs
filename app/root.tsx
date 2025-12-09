import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { RootProvider } from "fumadocs-ui/provider/base";
import { ReactRouterProvider } from "fumadocs-core/framework/react-router";
import { CookieConsent } from "./components/cookie-consent";
import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/svg+xml", href: "/konnektr.svg" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/konnektr.svg" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* SEO Essentials */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />

        {/* Theme */}
        <meta name="theme-color" content="#1E9E95" />
        <meta name="color-scheme" content="dark light" />

        <Meta />
        <Links />

        {/* Google Tag Manager with Consent */}
        {import.meta.env.VITE_GTM_ID ? (
          <>
            {/* Google Tag Manager script (head) */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  console.log('[GTM] Loading with ID: ${
                    import.meta.env.VITE_GTM_ID
                  }');
                  (function(w,d,s,l,i){
                    w[l]=w[l]||[];
                    w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                    j.async=true;
                    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                    f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${
                    import.meta.env.VITE_GTM_ID
                  }');
                `,
              }}
            />
          </>
        ) : (
          <script
            dangerouslySetInnerHTML={{
              __html: `console.log('[GTM] VITE_GTM_ID not set during build');`,
            }}
          />
        )}
      </head>
      <body className="flex flex-col min-h-screen">
        {/* Google Tag Manager noscript fallback */}
        {import.meta.env.VITE_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${
                import.meta.env.VITE_GTM_ID
              }`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <ReactRouterProvider>
          <RootProvider>{children}</RootProvider>
        </ReactRouterProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const setGtmConsent = (consent: "accepted" | "declined") => {
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
    }
  };

  // Callback for accepting cookies
  const handleAccept = () => {
    setGtmConsent("accepted");
  };

  // Callback for declining cookies
  const handleDecline = () => {
    setGtmConsent("declined");
  };

  return (
    <>
      <Outlet />
      {/* Render CookieConsent */}
      <CookieConsent
        variant="minimal"
        onAcceptCallback={handleAccept}
        onDeclineCallback={handleDecline}
      />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
