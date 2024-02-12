import Head from "next/head";
import React from "react";

export default function Confirmation() {
  return (
    <>
      <Head>
        <title>Email confirmation | ArtistryNest</title>
      </Head>
      <div className="confirmation-page">
        <h2>Thank you for signing up!</h2>
        <p>
          We've sent a confirmation email to your email address. Please check
          your inbox and click on the confirmation link to complete the
          registration process.
        </p>
        <p>
          If you don't see the email in your inbox, please check your spam
          folder.
        </p>
        <p>
          Once you've confirmed your email, you'll be able to log in and access
          all the features of ArtistryNest.
        </p>
        <p>Thank you for joining us!</p>
      </div>
    </>
  );
}
