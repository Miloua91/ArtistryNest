import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Brand from "@/pages/components/Brand";
import Esign from "@/pages/components/Esignup";
import AboutUsImg1 from "@/pages/img/about-us-img-1.webp";
import AboutUsImg2 from "@/pages/img/about-us-img-2.webp";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function About() {
  return (
    <>
      <Head>
        <title>About | ArtistryNest</title>
      </Head>
      <div className="about-us">
        <div className="about-title">
          <h1>
            A brand built on the love of craftmanship, quality and outstanding
            customer service
          </h1>
        </div>
        <div className="about-1st">
          <div className="about-idea">
            <h2>It started with a small idea</h2>
            <p>
              A global brand with local beginnings, our story began in a small
              studio in South London in early 2014
            </p>
            <div className="about-viewBtn">
              <Link href={"/products/all"}>
                <button id="about-view-colBtn">View Collection</button>
              </Link>
            </div>
          </div>
          <div className="about-img">
            <Image
              src={AboutUsImg1}
              alt="About us image"
              placeholder="blur"
              priority
            />
          </div>
        </div>
        <div className="about-2nd">
          <div className="about-img">
            <Image
              src={AboutUsImg2}
              alt="About us image"
              placeholder="blur"
              priority
            />
          </div>
          <div className="about-brand">
            <h2>
              Our service isn't just personal, it's actually hyper personally
              exquisite
            </h2>
            <p>
              When we started ArtisteryNest, the idea was simple. Make high
              quality furniture affordable and avaiblable for the mass market.
            </p>
            <p>
              Handmade, and lovingly crafted furniture and homeware is what we
              live breathe and design so our Chelsea boutique becomes the hotbed
              for the London interior design community.
            </p>
            <div className="about-getBtn">
              <Link href={"/contact"}>
                <button id="about-getInTouchBtn">Get in touch</button>
              </Link>
            </div>
          </div>
        </div>
        <Brand />
        <Esign />
      </div>
    </>
  );
}
