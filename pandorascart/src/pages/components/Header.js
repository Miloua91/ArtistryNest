import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import { useRouter } from "next/router";
import searchIcon from "@/pages/icons/Search.svg";
import cartIcon from "@/pages/icons/Shopping--cart.svg";
import userIcon from "@/pages/icons/User--avatar.svg";

export default function Header() {
  const { cart } = useCart();
  const router = useRouter();
  const { searchQuery, updateSearchQuery } = useSearch();

  const [isSearchVisible, setSearchVisible] = useState(false);

  function handleInputQuery(e) {
    const query = e.target.value;
    updateSearchQuery(query);
  }

  const handleCartIconClick = () => {
    router.push({
      pathname: "/cart",
      query: {
        count: cart.count,
        items: cart.items
          .map((item) => `${item.productId}-${item.count}`)
          .join(","),
      },
    });
  };

  useEffect(() => {
    if (router.pathname === "/products/all") {
    } else {
      setSearchVisible(false);
      updateSearchQuery("");
    }
  }, [router.pathname]);

  const handleSearchIconClick = () => {
    const trimmedQuery = searchQuery.trim();
    if (!isSearchVisible && trimmedQuery !== "") {
      updateSearchQuery(trimmedQuery);
    } else if (trimmedQuery !== "") {
      router.push({
        pathname: "/products/all",
        query: { searchQuery: trimmedQuery },
      });
      setSearchVisible(true);
      return;
    }
    setSearchVisible(!isSearchVisible);
  };

  const handleAllPageLinkClick = () => {
    updateSearchQuery("");
    setSearchVisible(false);
    router.push("/products/all");
  };

  return (
    <>
      <div className="name">
        <h1>
          <Link href={"/"}>ArtistryNest</Link>
        </h1>
      </div>
      <div className="top-right">
        <h2 className="about">
          <Link href={"/about"}>About us</Link>
        </h2>
        <h2 className="contact">
          <Link href={"/contact"}>Contact</Link>
        </h2>
        {isSearchVisible && (
          <div className="search-input-container">
            <input
              onChange={handleInputQuery}
              value={searchQuery}
              type="text"
              name="search"
              placeholder="Search for an item"
            />
          </div>
        )}
        <div className="searchIcon">
          <Image
            src={searchIcon}
            onClick={handleSearchIconClick}
            alt="Search"
          />
          <Image src={cartIcon} onClick={handleCartIconClick} alt="Cart" />
          {cart.count > 0 && (
            <span onClick={handleCartIconClick} className="cart-count">
              {cart.count}
            </span>
          )}
          <Image src={userIcon} alt="User" />
        </div>
      </div>
      <div className="bottom-nav">
        <h2>
          <div>
            <Link href="/products/all" as="/products/all" passHref>
              <span onClick={handleAllPageLinkClick}>All products</span>
            </Link>
          </div>
        </h2>
        <h2>
          <Link href={"/products/chairs"}>Chairs</Link>
        </h2>
        <h2>
          <Link href={"/products/tables"}>Tables</Link>
        </h2>
        <h2>
          <Link href={"/products/sofas"}>Sofas</Link>
        </h2>
        <h2>
          <Link href={"/products/lamps"}>Lamps</Link>
        </h2>
        <h2>
          <Link href={"/products/crockery"}>Crockery</Link>
        </h2>
        <h2>
          <Link href={"/products/ceramics"}>Ceramics</Link>
        </h2>
        <h2>
          <Link href={"/products/pots"}>Plant pots</Link>
        </h2>
      </div>
    </>
  );
}
