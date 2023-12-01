import Link from "next/link";
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
          <h3>21st St, Brooklyn</h3>
          <h3>New York City</h3>
          <h3>United States of America</h3>
          <h3>112 15</h3>
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
          <h3>All products</h3>
          <h3>Best sellers</h3>
          <h3>New arrivals</h3>
          <h3>Popular this week</h3>
          <h3>Recently viewed</h3>
        </div>
        <div className="categories">
          <h2>Categories</h2>
          <Link href={"/products/chairs"}>
            Chairs
          </Link>
          <Link href={"/products/lamps"}>
            Lamps
          </Link>
          <Link href={"/products/pots"}>
            Plant Pots
          </Link>
          <Link href={"/products/sofas"}>
            Sofas
          </Link>
          <Link href={"/products/tables"}>
            Tables
          </Link>
        </div>
        <div className="company">
          <h2>Our company</h2>
          <Link href={"/about"}>
            About
          </Link>
          <Link href={'/contact'}>
            Contact us
          </Link>
          <Link href={'/'}>
          Return policy
          </Link>
          <Link href={'/'}>
          Privacy
          </Link>
          <Link href={'/'}>
          Vacancies
          </Link>
        </div>
        <div className="credit">
          <h3>Copyright 2023 ArtistryNest LLC</h3>
        </div>
      </div>
    </>
  );
}
