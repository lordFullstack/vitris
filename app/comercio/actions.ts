"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/data/supabase/server-client";

export async function signOutMerchant() {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/comercio/login");
}
