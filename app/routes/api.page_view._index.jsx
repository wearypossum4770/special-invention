import { json } from "@remix-run/node"; // or cloudflare/deno
import { createPageView } from "~/models/pageview.server";

export const loader = async () => json({ success: true });

export const action = async ({ request }) => {
  switch (request.method) {
    case "POST":
      createPageView(request.data);
      return { success: true };
  }
};
