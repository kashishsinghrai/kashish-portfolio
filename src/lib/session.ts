"use server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth";

/**
 * Reads and cryptographically verifies the navojit_access_token cookie.
 */
export async function getSessionToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("navojit_access_token")?.value;
  return token || null;
}

/**
 * Returns true if the current session has a valid, non-expired JWT.
 */
export async function isAuthenticated() {
  const token = await getSessionToken();
  if (!token) return false;
  const payload = verifyJwt(token);
  return payload !== null;
}

/**
 * Clears the session cookie to securely log the user out.
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("navojit_access_token");
}
