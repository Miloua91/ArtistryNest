import { useState, useEffect } from "react";
import Image from "next/image";
import Signup from "@/pages/img/signup.webp";
import { toast } from "sonner";

export default function Esign() {
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState({
    subType: ["offers", "events", "discounts"],
  });

  const handleSub = (e) => {
    const { value, checked } = e.target;
    setSub((prevSub) => ({
      subType: checked
        ? [...prevSub.subType, value]
        : prevSub.subType.filter((e) => e !== value),
    }));
  };

  async function Sub() {
    if (sub.subType.length === 0) {
      toast.error("Please select at least one subscription type.");
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            id: email,
            offers: sub.subType.includes("offers"),
            events: sub.subType.includes("events"),
            discounts: sub.subType.includes("discounts"),
          },
        ]),
      });
      if (response.ok) {
        toast.success("Subscription successful!");
      } else {
        toast.error("Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  }

  const handleSignUp = () => {
    if (validateEmail(email)) {
      Sub();
    } else {
      toast.error("Please enter a valide email.");
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  return (
    <>
      <div className="email-signup">
        <Image
          id="signup-image"
          src={Signup}
          alt="signup-image"
          placeholder="blur"
          priority
        />
        <div className="join-the-club">Join the club and get the benefits</div>
        <div className="newsletter">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pop up stores and more
        </div>
        <div className="email-checkbox">
          <label>
            <input
              type="checkbox"
              onChange={handleSub}
              name="subscribe"
              value="offers"
              className="checkbox"
              defaultChecked
            />{" "}
            Exclusive offers
          </label>
          <label>
            <input
              type="checkbox"
              onChange={handleSub}
              name="subscribe"
              value="events"
              className="checkbox"
              defaultChecked
            />{" "}
            Free events
          </label>
          <label>
            <input
              type="checkbox"
              onChange={handleSub}
              name="subscribe"
              value="discounts"
              className="checkbox"
              defaultChecked
            />{" "}
            Large discounts
          </label>
        </div>
        <div className="email-input">
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="your@email.com"
          />
          <button onClick={handleSignUp} id="signupBtn">
            Sign up
          </button>
        </div>
      </div>
    </>
  );
}
