"use server";
import { cookies } from "next/headers";

/**
 * Reads the secure navojit_access_token from cookies.
 * This should be used in Next.js Server Actions or Server Components
 * to verify if a user has an active session.
 */
export async function getSessionToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("navojit_access_token")?.value;
  return token || null;
}

/**
 * A helper to quickly verify if the current request is authenticated.
 * It does not validate the JWT cryptographically here; 
 * it simply checks for the presence of the cookie. 
 * Real cryptographic validation can be passed to NavojitAuth if needed.
 */
export async function isAuthenticated() {
  const token = await getSessionToken();
  return !!token;
}

/**
 * Clears the session cookie to securely log the user out.
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("navojit_access_token");
}
