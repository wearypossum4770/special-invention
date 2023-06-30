import { cssBundleHref } from "@remix-run/css-bundle";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getUser } from "~/session.server";
// import stylesheet from "~/tailwind.css";
import "~/assets/css/all.min.css";
import "~/assets/css/dashboard.css";
import "~/assets/css/forms.css";
import "~/assets/css/main.css";
import "~/assets/css/navigation.css";
import Navigation from "~/routes/navigation.jsx";
export const links = () => [
  // { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  const logData = async (event) => {
    if (document.visibilityState === "visible") {
      console.log("i'm here", window.location.pathname);
    }
    if (document.visibilityState === "hidden") {
      // navigator.sendBeacon
      console.log("/log", window.analyticsData);
    }
  };
  try {
    window.analyticsData = window.analyticsData || [];
    document.addEventListener("visibilitychange", logData(), { once: true });
  } catch (error) {
    //
  }
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <Meta />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css"
          integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X"
          crossOrigin="anonymous"
        />
        <Links />
      </head>
      <body className="h-full">
        <Navigation />
        <Outlet />
        <ScrollRestoration />
        <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/marked-highlight/lib/index.umd.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/marked-katex-extension/lib/index.umd.js"></script>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
