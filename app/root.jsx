import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
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

const getDocumentSize = ({
  scrollWidth,
  offsetWidth,
  clientWidth,
  scrollHeight,
  offsetHeight,
  clientHeight,
}) => {
  try {
    return {
      document_height: Math.max.apply(this, [
        document.body.scrollHeight,
        scrollHeight,
        document.body.offsetHeight,
        offsetHeight,
        document.body.clientHeight,
        clientHeight,
      ]),
      document_width: Math.max.apply(this, [
        doument.body.scrollWidth,
        scrollWidth,
        doument.body.offsetWidth,
        offsetWidth,
        doument.body.clientWidth,
        clientWidth,
      ]),
    };
  } catch (error) {
    //
  }
};
const getViewport = () => {
  try {
    return {
      viewport_height: window.innerHeight,
      viewport_width: window.innerWidth,
    };
  } catch (error) {
    //
  }
};
const getForm = () => {
  try {
    const forms = document.querySelectorAll("[data-analytic-name]");
    console.log(forms);
  } catch (error) {}
};
const extractClassList = ({ classList }) => ({
  classList: Array.from(classList),
});
export default function App() {
  const handleClick = ({
    x,
    y,
    timeStamp,
    detail,
    type,
    _vts,
    _reactName,
    target,
  }) => {
    const {
      __vueParentComponent,
      __vnode,
      scrollHeight,
      offsetHeight,
      clientHeight,
      scrollWidth,
      offsetWidth,
      clientWidth,
      classList,
      nodeName,
      id,
    } = target;
    navigator.sendBeacon("", {
      ...getViewport(),
      ...getDocumentSize({
        scrollHeight,
        offsetHeight,
        clientHeight,
        scrollWidth,
        offsetWidth,
        clientWidth,
      }),
      vue_framework: !!__vueParentComponent || !!__vnode,
      react_framework: !!_reactName,
      event_time: _vts ?? Date.now(),
      event_type: 1,
      detail,
      event_action: type.toUpperCase(),
      class_list: extractClassList({ classList }),
      elemnent_type: nodeName,
      id,
      x,
      y,
      waterfall: timeStamp,
    });
  };
  try {
    pipButton.addEventListener("click", async () => {
      const player = document.querySelector("#player");

      // Open a Picture-in-Picture window.
      const pipWindow = await documentPictureInPicture.requestWindow();

      // Move the player to the Picture-in-Picture window.
      pipWindow.document.body.append(player);
    });
  } catch (error) {}
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
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KDG8N4P&gtm_auth=_0B6EdbI8a69X2_kVEUsxQ&gtm_preview=env-2&gtm_cookies_win=x"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
        <Navigation />
        <form name="cloud_login"></form>
        <form data-analytic-name="cloud_login"></form>
        <form id="cloud_login"></form>
        <button style={{ display: "block", padding: "50px" }} id="pipButton">
          Open Picture-in-Picture window
        </button>
        <button
          style={{ display: "block", padding: "50px" }}
          id="step-heading"
          className="text-xl"
          onClick={handleClick}
        >
          Click Me
        </button>
        <div id="playerContainer">
          <div id="player">
            <video id="video"></video>
          </div>
        </div>
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
