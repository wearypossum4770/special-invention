import { json } from "@remix-run/node"; // or cloudflare/deno
import {
  identify,
  identityList
} from "~/models/user.server.js";

export const loader = async () => json({ anonymousUsers:await identityList(), success: true})

export const action = async ({ request }) => {
  switch (request.method) {
    default:
      return {success: false}
    case "POST":
      return { success: true, ...identify(JSON.parse(await request.text())) };
  }
};
