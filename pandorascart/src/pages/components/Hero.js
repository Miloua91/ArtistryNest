import Image from "next/image";
import Link from "next/link";
import HeroImg from "@/pages/img/hero.webp";

export default function Hero() {
  return (
    <>
      <div className="hero">
        <Image
          className="hero-img"
          src={HeroImg}
          alt="Hero-image"
          width={1920}
          height={1080}
          placeholder="blur" 
          priority
        />
        <div className="block">
          <p id="hero-text">
            Luxury homeware for people
            <br />
            who love timelesss design quality
          </p>
          <p id="hero-text-phone">
            Luxury homeware for people who love timelesss design quality
          </p>
          <p id="shop-text">Shop the new Winter 2024 collection today</p>
          <p id="shop-text-phone">
            With our new collection, view over 400 bespoke pieces from homeware
            through to furniture today
          </p>
          <Link href={"/products/all"}>
            <button id="viewButt">View collection</button>
          </Link>
        </div>
      </div>
    </>
  );
}
