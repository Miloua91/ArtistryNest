import Image from "next/image";
import facebookLogo from "@/pages/icons/Logo--facebook.svg";
import instagramLogo from "@/pages/icons/Logo--instagram.svg";
import linkedinLogo from "@/pages/icons/Logo--linkedin.svg";
import pinterestLogo from "@/pages/icons/Logo--pinterest.svg";
import skypeLogo from "@/pages/icons/Logo--skype.svg";
import twitterLogo from "@/pages/icons/Logo--twitter.svg";

export default function Footer() {
  return (
    <>
      <div className="foot">
        <div className="adress">
          <h1 className="foot-name">ArtistryNest</h1>
          <h3>21 New York Street</h3>
          <h3>New York City</h3>
          <h3>United States of America</h3>
          <h3>432 34</h3>
        </div>
        <div className="socials">
          <h2>Social links</h2>
          <Image src={facebookLogo} alt="Facebook" />
          <Image src={instagramLogo} alt="Instagram" />
          <Image src={twitterLogo} alt="Twitter" />
          <Image src={linkedinLogo} alt="LinkedIn" />
          <Image src={pinterestLogo} alt="Pinterest" />
          <Image src={skypeLogo} alt="Skype" />
        </div>
        <div className="menu">
          <h2>Menu</h2>
          <h3>New arrivals</h3>
          <h3>Best sellers</h3>
          <h3>Recently viewed</h3>
          <h3>Popular this week</h3>
          <h3>All products</h3>
        </div>
        <div className="categories">
          <h2>Categories</h2>
          <h3>Crockery</h3>
          <h3>Furniture</h3>
          <h3>Homeware</h3>
          <h3>Plant pots</h3>
          <h3>Chairs</h3>
        </div>
        <div className="company">
          <h2>Our company</h2>
          <h3>About us</h3>
          <h3>Vacancies</h3>
          <h3>Contact us</h3>
          <h3>Privacy</h3>
          <h3>Return policy</h3>
        </div>
        <div className="credit">
          <h3>Copyright 2023 ArtistryNest LLC</h3>
        </div>
      </div>
    </>
  );
}
