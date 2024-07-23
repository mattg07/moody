import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import signOut from "../../app/login/action";
import { Button } from "@/components/ui/button";

export default async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="bg-scarlet shadow">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-800"><Link href={"/"}>Moody</Link></div>
        <nav className="flex items-center gap-4">
          <Link href="/">Home</Link>
          {user !== null ? (
            <>
              <Link href="/create">Create</Link>
              <form action={signOut} className="inline">
                <Button className="bg-gray-100 text-gray-800 hover:bg-gray-400">Sign Out</Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
