import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | ArtistryNest</title>
      </Head>
      <div className="contact">
        <form className="contact-form">
          <h1>Get in touch</h1>
          <p>
            Hello there! Have a question about our pieces or a custom order in
            mind? Feel free to reach out! Your satisfaction is our priority.
          </p>
          <div className="contact-input">
            <input
              type="text"
              name="contact-name"
              placeholder="Name"
              required
            />
            <input type="text" name="street" placeholder="Street" />
            <div className="contact-city">
              <input
                id="contact-city"
                type="text"
                name="city"
                placeholder="City"
              />
              <input
                id="contact-postcode"
                type="text"
                name="postcode"
                placeholder="Postcode"
              />
            </div>
            <input type="tel" name="tel" placeholder="Phone number" />
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
            />
            <textarea
              id="contact-message"
              name="text"
              placeholder="Your message"
              required
            />
            <div className="submit-section">
              <button id="contact-submitBtn">Submit</button>
              <div className="contact-info">
                <a
                  href="mailto:mokh@artistrynest.shop"
                  className="contact-email"
                >
                  mokh@artistrynest.shop
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
