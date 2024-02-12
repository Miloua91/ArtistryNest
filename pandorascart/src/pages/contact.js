import Head from "next/head";
import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";
import { useUser } from "@supabase/auth-helpers-react";

export default function Contact() {
  const [state, handleSubmit] = useForm("mjvqndqa");
  const user = useUser();

  if (state.succeeded) {
    return (
      <div className="contact-sub">
        <p>Thank you for reaching out to us!</p>
        <Link href="/products/all">
          Feel free to explore more of our products.
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Contact | ArtistryNest</title>
      </Head>
      <div className="contact">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h1>Get in touch</h1>
          <p>
            Hello there! Have a question about our pieces or a custom order in
            mind? Feel free to reach out! Your satisfaction is our priority.
          </p>
          <div className="contact-input">
            <input
              type="text"
              name="contactName"
              placeholder="Name"
              value={user ? user.user_metadata.full_name : ""}
              readOnly
              required
            />
            <ValidationError
              prefix="Contact Name"
              field="name"
              errors={state.errors}
            />
            <input type="text" name="street" placeholder="Street" />
            <ValidationError
              prefix="Street"
              field="street"
              errors={state.errors}
            />
            <div className="contact-city">
              <input
                id="contact-city"
                type="text"
                name="city"
                placeholder="City"
              />
              <ValidationError
                prefix="City"
                field="city"
                errors={state.errors}
              />
              <input
                id="contact-postcode"
                type="text"
                name="postcode"
                placeholder="Postcode"
              />
              <ValidationError
                prefix="Postcode"
                field="postcode"
                errors={state.errors}
              />
            </div>
            <input type="tel" name="tel" placeholder="Phone number" />
            <ValidationError prefix="Phone" field="tel" errors={state.errors} />
            <input
              type="email"
              name="email"
              value={user ? user.email : ""}
              readOnly
              placeholder="your@email.com"
              required
            />
            <ValidationError
              prefix="Contact Name"
              field="name"
              errors={state.errors}
            />
            <textarea
              id="contact-message"
              name="message"
              placeholder="Your message"
              required
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <div className="submit-section">
              <button
                id="contact-submitBtn"
                type="submit"
                disabled={state.submitting}
              >
                Submit
              </button>
              <div className="contact-info">
                <a
                  href="mailto:sales@artistrynest.shop"
                  className="contact-email"
                >
                  sales@artistrynest.shop
                </a>
                <a href="tel:+1 718-724-9873" className="contact-phone">
                  718-724-9873
                </a>
              </div>
            </div>
          </div>
        </form>
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3026.548248505782!2d-73.99689452397678!3d40.66188757140116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25ae61a2dd085%3A0xc4b35bc9e55c0788!2s21st%20St%2C%20Brooklyn%2C%20NY%2C%20%C3%89tats-Unis!5e0!3m2!1sfr!2sdz!4v1701425495927!5m2!1sfr!2sdz"
            width="600"
            height="520"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
}
