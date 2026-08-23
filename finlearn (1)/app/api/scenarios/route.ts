import { NextResponse } from "next/server";

/**
 * Placeholder for scenario persistence once there's a real backend.
 * Right now the app reads/writes localStorage directly (see lib/storage.ts)
 * so it works with zero setup. Once a database is wired up:
 *
 *   TODO(real-db):
 *   - GET: look up scenarios for the signed-in user from Postgres/Firestore
 *   - POST: insert a new scenario row/document tied to the user's id
 *   - DELETE: remove a scenario by id, scoped to the signed-in user
 *
 * lib/storage.ts is the only file that needs to change to call these
 * routes instead of localStorage — every page that saves/loads scenarios
 * goes through that module already.
 */
export async function GET() {
  return NextResponse.json({ scenarios: [] }, { status: 501 });
}

export async function POST() {
  return NextResponse.json({ message: "Not implemented — see TODO(real-db) in this file." }, { status: 501 });
}
