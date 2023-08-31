import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const supabase = createClient(
  "https://osaoeebokyudngypsfhq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zYW9lZWJva3l1ZG5neXBzZmhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0MzQ0NTgsImV4cCI6MjAwOTAxMDQ1OH0.locDhmsV4Syi21cXan2nfNSOImtYVYFR2D3NysOctE4"
);

const Authentication = () => {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl">Login</h1>
      <div className="w-[20%]" onSubmit={() => {setTimeout(()=>router.push("/"),500)}}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Authentication;
