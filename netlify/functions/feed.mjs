import { getStore } from "@netlify/blobs";

// Shared goldfish feed counter. GET returns the count, POST adds one.
export default async (req) => {
  const store = getStore("goldfish");
  let count = parseInt((await store.get("fed")) || "0", 10) || 0;
  if (req.method === "POST") {
    count += 1;
    await store.set("fed", String(count));
  } else if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }
  return Response.json({ count }, { headers: { "cache-control": "no-store" } });
};

export const config = { path: "/api/feed" };
