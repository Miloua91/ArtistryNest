import Image from "next/image";
import Delivery from "@/pages/icons/Delivery.svg";
import Checkmark from "@/pages/icons/Checkmark--outline.svg";
import Purchase from "@/pages/icons/Purchase.svg";
import Sprout from "@/pages/icons/Sprout.svg";

export default function Brand() {
  return (
    <>
      <div className="brand-info">
        <h2>What makes our brand diffrent</h2>
      </div>
      <div className="brand-info-grid">
        <div className="grid-1">
          <Image src={Delivery} alt="Delivery" />
          <h2>Next day as standard</h2>
          <h3>Order before 3pm and get your order the next day as standard</h3>
        </div>
        <div className="grid-2">
          <Image src={Checkmark} alt="Checkmark" />
          <h2>Made by true artisans</h2>
          <h3>
            Handmade crafted goods made with real passion and craftmanship
          </h3>
        </div>
        <div className="grid-3">
          <Image src={Purchase} alt="Purchase" />
          <h2>Unbeatable prices</h2>
          <h3>
            For our materials and quality you won't find better prices anywhere
          </h3>
        </div>
        <div className="grid-4">
          <Image src={Sprout} alt="Sprout" />
          <h2>Recycles packaging</h2>
          <h3>
            We use 100% recycled packaging to ensure our footprint is more
            manageable
          </h3>
        </div>
      </div>
    </>
  );
}
