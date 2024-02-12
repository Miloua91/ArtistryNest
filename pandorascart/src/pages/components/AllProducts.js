import Image from "next/image";
import Link from "next/link";
import Filter from "./FilterMenu";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Products({ apiEndpoint, pageHeader }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [selectedPriceOption, setSelectedPriceOption] = useState("");
  const [selectedSortingOption, setSelectedSortingOption] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [noProduct, setNoProduct] = useState(false);

  useEffect(() => {
    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => {
        const sortedProducts = data.data.sort((a, b) => a.id - b.id);
        setProducts(data.data);
        setFilterProducts(sortedProducts);
        setDisplayedProducts(sortedProducts.slice(0, 12));
        setLoading(false);
        setNoProduct(sortedProducts.length === 0);
      });
  }, [apiEndpoint]);

  useEffect(() => {
    filteringProducts();
  }, [selectedPriceOption, selectedSortingOption]);

  const filterFunctions = {
    "low-to-high": (a, b) => a.price - b.price,
    "high-to-low": (a, b) => b.price - a.price,
    "alphabitical_a-z": (a, b) => a.product_name.localeCompare(b.product_name),
    "alphabitical_z-a": (a, b) => b.product_name.localeCompare(a.product_name),
    new: (a, b) => new Date(b.date_added) - new Date(a.date_added),
    old: (a, b) => new Date(a.date_added) - new Date(b.date_added),
  };

  function filteringProducts() {
    let filteredProducts = [...filterProducts];
    if (selectedPriceOption && filterFunctions[selectedPriceOption]) {
      filteredProducts.sort(filterFunctions[selectedPriceOption]);
    } else {
      filteredProducts.sort((a, b) => a.id - b.id);
    }

    if (selectedSortingOption && filterFunctions[selectedSortingOption]) {
      filteredProducts.sort(filterFunctions[selectedSortingOption]);
    }
    setDisplayedProducts(filteredProducts.slice(0, displayedProducts.length));
    setFilterProducts(filteredProducts);
  }

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
      {noProduct ? (
        <div className="no-product">
          <h1>
            We are sorry,
            <br />
            there are no products found that fits your search
          </h1>
        </div>
      ) : (
        <>
          <div className="page-header">
            <div>
              <h1>{pageHeader}</h1>
            </div>
            <div>
              <Filter
                onPriceChange={setSelectedPriceOption}
                onSortingChange={setSelectedSortingOption}
              />
            </div>
          </div>
          {loading ? (
            <div className="all-products">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="products">
                  <Skeleton className="mobile-skeleton" height={"12.5em"} />
                  <Skeleton className="mobile-skeleton" width={292} />
                  <Skeleton className="mobile-skeleton" width={60} />
                </div>
              ))}
            </div>
          ) : (
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
          )}
          {displayedProducts.length < products.length && (
            <div className="load-button">
              <button id="loadBtn" onClick={loadProducts} disabled={loading}>
                Load
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
