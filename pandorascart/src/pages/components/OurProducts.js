import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function OurProducts({ resetCount }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products?search=*")
      .then((res) => res.json())
      .then((data) => {
        const sortedProducts = data.data.sort(
          (a, b) => new Date(b.date_added) - new Date(a.date_added)
        );
        setProducts(sortedProducts);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/api/popular")
      .then((res) => res.json())
      .then((data) => {
        setPopularProducts(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="new-ceramics">
        <a>New products</a>
        {loading ? (
          <div className="new-products">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="product">
                <Skeleton className="mobile-skeleton" height={"50vmin"} />
                <Skeleton className="mobile-skeleton" width={292} />
                <Skeleton className="mobile-skeleton" width={60} />
              </div>
            ))}
          </div>
        ) : (
          <div className="new-products">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="product">
                <Link
                  onClick={resetCount}
                  href={`/products/pdp/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Image
                    src={product.image}
                    alt="ArtistryNest Product"
                    width={405}
                    height={475}
                    blurDataURL="data:image/png>;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8+R8AAvcB+vBGZskAAAAASUVORK5CYII="
                    placeholder="blur"
                  />
                  <br />
                  {product.product_name}
                </Link>
                <br />£{product.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="view-col">
        <Link href={"/products/all"}>
          <button id="viewCol">View collection</button>
        </Link>
      </div>
      <div className="popular">
        <a>Our popular products</a>
        {loading ? (
          <div className="popular-products">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="our-products">
                <Skeleton className="mobile-skeleton" width={'100%'} height={"20em"} />
                <Skeleton className="mobile-skeleton" width={'12ch'} />
                <Skeleton className="mobile-skeleton" width={60} />
              </div>
            ))}
          </div>
        ) : (
          <div className="popular-products">
            {popularProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="our-product">
                <Link
                  onClick={resetCount}
                  href={`/products/pdp/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Image
                    src={product.image}
                    alt="ArtistryNest Product"
                    width={405}
                    height={475}
                    sizes="100vw"
                    blurDataURL="data:image/png>;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8+R8AAvcB+vBGZskAAAAASUVORK5CYII="
                    placeholder="blur"
                  />
                  {product.product_name}
                </Link>
                <br />£{product.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="view-pop-col">
        <Link href={"/products/all"}>
          <button id="viewPopCol">View collection</button>
        </Link>
      </div>
    </>
  );
}
