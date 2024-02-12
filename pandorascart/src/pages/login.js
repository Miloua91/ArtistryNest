import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Log from "@/pages/img/log.webp";
import { toast } from "sonner";

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        toast.warning(error.message);
      } else {
        toast.success(`Nice seeing you again`);
        router.push("/");
        router.reload();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <Head>
        <title>Log in | ArtistryNest</title>
      </Head>
      <div className="sign-in-page">
        <div className="sign-in-img">
          <Image src={Log} alt="Sign-img" placeholder="blur" priority />
        </div>
        <div className="sign-in-form">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
            />
            <label>Your email</label>
            <div className="pass-container">
              <input
                id="passwd"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
              />
              <label id="passwdLabel">Password</label>
              <button
                type="button"
                className="toggle-password-login"
                onClick={handleTogglePassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              <div className="forgot">
                <Link href={"/forgot_password"}>Forgot your password?</Link>
              </div>
            </div>
            <div className="sign-up-button">
              <p>
                Don't have an account? <br />
                <Link scroll={false} href={"signup"}>
                  Sing up instead.
                </Link>
              </p>
              <button type="submit">Log in</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
