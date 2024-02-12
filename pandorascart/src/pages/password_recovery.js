import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

export default function PassRec() {
  const supabaseClient = useSupabaseClient();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const pass = e.target.password.value;

    try {
      const { data, error } = await supabaseClient.auth.updateUser({
        password: pass,
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("You have successfully reset your password.");
        router.push("/account");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  function togglePass() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  return (
    <>
      <Head>
        <title>Password reset | ArtistryNest</title>
      </Head>
      <div>
        <form className="pass-rec-form" onSubmit={handleSubmit}>
          <div className="pass-rec-inner">
            <lable>Type a new password</lable>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Your new password"
            />
            <button
              type="button"
              className="pass-rec-toggle"
              onClick={togglePass}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            <button className="pass-rec-sub" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
