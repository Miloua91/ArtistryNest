import Brand from "@/pages/components/Brand";
import OurProducts from "@/pages/components/OurProducts";
import Esign from "@/pages/components/Esignup";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1);
  const router = useRouter();
  const { id } = router.query;

  const { addToCart } = useCart();
  const productInfo = {
    image: product.image,
    product_name: product.product_name,
    description: product.description,
    price: product.price,
  };

  useEffect(() => {
    fetch(`/api/productid?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const productDetails = data.data[0];
        setProduct(productDetails);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  const increment = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const handleCart = () => {
    const { newCount, existingItem } = addToCart(
      count,
      product.id,
      productInfo
    );

    if (count === 0) {
      toast.error(`Please add a specific quantity of items to your cart.`);
    } else if (newCount >= 10) {
      if (newCount - existingItem.count === 0) {
        toast.info(`You can't add more than 10 items.`);
      } else {
        toast.info(
          `We've added ${
            newCount - existingItem.count
          } to your cart, but you can't exceed 10 of this item.`
        );
      }
    } else {
      toast.success(
        `${count} ${count === 1 ? "item" : "items"} of ${
          product.product_name
        } added to your cart.`
      );
    }
  };

  function resetCount() {
    setCount(1);
  }
  return (
    <>
      <div className="pdp">
        <div className="pd-image">
          {product.image && (
            <Image
              src={product.image}
              alt={product.product_name}
              width={1200}
              height={1200}
            />
          )}
        </div>
        <div className="product-details">
          <h1 className="title">{product.product_name}</h1>
          <h2>£{product.price}</h2>
          <a className="title">Product description</a>
          <p className="details">{product.description}</p>
          <a className="title">Dimensions</a>
          <br />
          <br />
          <div className="dimensions">
            <div>
              <a className="title">Height</a>
              <br />
              <a className="details">{product.height}cm</a>
            </div>
            <div>
              <a className="title">Width</a>
              <br />
              <a className="details">{product.width}cm</a>
            </div>
          </div>
          <div className="addToCart-section">
            <div className="counter">
              <a>Amount:</a>
              <button onClick={decrement}>-</button>
              <p>{count}</p>
              <button onClick={increment}>+</button>
            </div>
            <button onClick={handleCart} id="addToCartBtn">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <Brand />
      <OurProducts resetCount={resetCount} />
      <Esign />
    </>
  );
}
