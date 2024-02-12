import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import Log from "@/pages/img/log.webp";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(true);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const passwordConditions = {
    minLength: 8,
    hasUppercase: /[A-Z]/,
    hasLowercase: /[a-z]/,
    hasDigit: /\d/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>+-]/,
    hasNoSpaces: /^\S+$/,
  };

  const validatePassword = (password) => {
    return (
      password.length >= passwordConditions.minLength &&
      passwordConditions.hasUppercase.test(password) &&
      passwordConditions.hasLowercase.test(password) &&
      passwordConditions.hasDigit.test(password) &&
      passwordConditions.hasSpecialChar.test(password) &&
      passwordConditions.hasNoSpaces.test(password)
    );
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordFocused(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = e.target.password.value;

    if (!validatePassword(password)) {
      toast.error("Password does not meet the required conditions.");
      return;
    }

    const firstName = e.target["first-name"].value;
    const lastName = e.target["last-name"].value;
    const email = e.target.email.value;

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (isValidEmail(email)) {
      try {
        const { user, error } = await supabaseClient.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              full_name: `${firstName} ${lastName}`,
            },
            redirectTo: "https://artistrynest.shop/account"
          },
        });

        if (error) {
          toast.error(error.message);
        } else {
          router.push("/confirmation");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.warning("Invalid email format.");
    }
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(false);
  };

  return (
    <>
      <Head>
        <title>Sign up | ArtistryNest</title>
      </Head>
      <div className="sign-in-page">
        <div className="sign-in-img">
          <Image src={Log} alt="Sign-img" placeholder="blur" priority />
        </div>
        <div className="sign-in-form">
          <form onSubmit={handleSubmit}>
            <div className="sign-in-name">
              <input
                type="text"
                name="first-name"
                placeholder="First Name"
                required
              />
              <label id="nameLabel">First Name</label>
              <input
                id="lastName"
                type="text"
                name="last-name"
                placeholder="Last Name"
                required
              />
              <label id="lastLabel">Last Name</label>
            </div>
            <div className="sign-in-email">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
              />
              <label>Your email</label>
              <div className="pass-container">
                <input
                  id="signpass"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={handlePasswordFocus}
                  required
                />
                <label id="signLabel">Password</label>
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowPassword((prevShowPassword) => !prevShowPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <ul
                className={`password-conditions ${
                  isPasswordFocused || validatePassword(password)
                    ? "active"
                    : ""
                }`}
              >
                <li
                  style={{
                    color:
                      password.length >= passwordConditions.minLength
                        ? "green"
                        : "red",
                  }}
                >
                  At least {passwordConditions.minLength} characters
                </li>
                <li
                  style={{
                    color: passwordConditions.hasUppercase.test(password)
                      ? "green"
                      : "red",
                  }}
                >
                  Contains at least one uppercase letter
                </li>
                <li
                  style={{
                    color: passwordConditions.hasLowercase.test(password)
                      ? "green"
                      : "red",
                  }}
                >
                  Contains at least one lowercase letter
                </li>
                <li
                  style={{
                    color: passwordConditions.hasDigit.test(password)
                      ? "green"
                      : "red",
                  }}
                >
                  Contains at least one digit
                </li>
                <li
                  style={{
                    color: passwordConditions.hasSpecialChar.test(password)
                      ? "green"
                      : "red",
                  }}
                >
                  Contains at least one special character
                </li>
                <li
                  style={{
                    color: passwordConditions.hasNoSpaces.test(password)
                      ? "green"
                      : "red",
                  }}
                >
                  Contains no spaces
                </li>
              </ul>
            </div>
            <div className="sign-up-button">
              <p>
                Have an account? <br />{" "}
                <Link scroll={false} href={"login"}>
                  Log in instead.
                </Link>
              </p>
              <button type="submit">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
