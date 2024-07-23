'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";

export async function emailLogin(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/login?message=Error signing up");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

export default async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect("/login?message=No provider selected");
  }

  const supabase = createClient();
  const redirectTo = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectTo,
      scopes: "email", // Include any other scopes you need
      queryParams: {
        prompt: 'select_account', // Force account selection
      },
    },
  });

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }

  return redirect(data.url);
}
