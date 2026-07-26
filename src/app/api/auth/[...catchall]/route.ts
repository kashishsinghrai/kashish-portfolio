export const dynamic = "force-dynamic";

// This catchall route is no longer needed since we handle auth directly
// in /api/auth/route.ts. Keeping this file to avoid 404s on old routes.

export async function POST() {
  return Response.json({ error: "Use /api/auth instead." }, { status: 404 });
}

export async function GET() {
  return Response.json({ error: "Use /api/auth instead." }, { status: 404 });
}
