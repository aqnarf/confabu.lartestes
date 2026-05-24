"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  hasAdminCredentials,
  verifyAdminCredentials,
} from "@/lib/auth/admin";

export async function loginAdminAction(formData: FormData) {
  const username = readText(formData, "username");
  const password = readText(formData, "password");

  if (!hasAdminCredentials()) {
    redirect("/admin/login?error=missing-config");
  }

  const isValid = await verifyAdminCredentials(username, password);

  if (!isValid) {
    redirect("/admin/login?error=invalid");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, await createAdminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);

  redirect("/admin/login");
}

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}
