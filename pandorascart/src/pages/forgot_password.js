import Head from "next/head";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PassOublier() {
  const [resetSuccessful, setResetSuccessful] = useState(false);
  const supabaseClient = useSupabaseClient();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
        email,
        { redirectTo: "http://artistrynest.shop/password_recovery" }
      );
      if (error) {
        toast.error(error.message);
      } else {
        setResetSuccessful(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Password reset | ArtistryNest</title>
      </Head>
      <div>
        {resetSuccessful ? (
          <div className="pass-rec">
            <label>Check your email for the recovery link!</label>
          </div>
        ) : (
          <form className="pass-rec" onSubmit={handleSubmit}>
            <label>
              Forgot your password? No worries! Simply type in your email, and
              we will send you a reset link.
            </label>
            <input type="text" name="email" placeholder="Email" />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </>
  );
}
