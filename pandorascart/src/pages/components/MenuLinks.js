import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Products({ apiEndpoint, pageHeader }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => {
        const sortedProducts = data.data.sort(
          (a, b) => new Date(b.date_added) - new Date(a.date_added)
        );
        setProducts(data.data);
        setFilterProducts(sortedProducts);
        setDisplayedProducts(sortedProducts.slice(0, 12));
        setLoading(false);
      });
  }, [apiEndpoint]);

  function loadProducts() {
    const currentProducts = displayedProducts.length;
    const remainingProducts = filterProducts.slice(
      currentProducts,
      currentProducts + 12
    );
    setDisplayedProducts([...displayedProducts, ...remainingProducts]);
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h1>{pageHeader}</h1>
        </div>
      </div>
      {!loading ? (
        <>
          <div className="all-products">
            {displayedProducts.map((product) => (
              <div key={product.id} className="products">
                <Link
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
          {displayedProducts.length < products.length && (
            <div className="load-button">
              <button id="loadBtn" onClick={loadProducts} disabled={loading}>
                Load
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="all-products">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="products">
              <Skeleton className="mobile-skeleton" height={"12em"} />
              <Skeleton className="mobile-skeleton" width={292} />
              <Skeleton className="mobile-skeleton" width={60} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
