import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import { useRouter as useRouterDefault } from "next/router";
import { useRouter as useRouterNavigation } from "next/navigation";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import searchIcon from "@/pages/icons/Search.svg";
import cartIcon from "@/pages/icons/Shopping--cart.svg";
import userIcon from "@/pages/icons/User--avatar.svg";
import { deleteCookie } from "cookies-next";

export default function Header() {
  const { cart } = useCart();
  const router = useRouterDefault();
  const routerNaviagtion = useRouterNavigation();
  const { searchQuery, updateSearchQuery } = useSearch();
  const [accountModal, setAccountModal] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const handleLogout = async () => {
    let { error } = await supabaseClient.auth.signOut();
    deleteCookie("userId");
    routerNaviagtion.refresh();
  };

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
    const handleRouteChange = (url) => {
      setAccountModal(false);
      if (url && !url.includes("/products/all")) {
        setSearchVisible(false);
        updateSearchQuery("");
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  const handleSearchIconClick = () => {
    const trimmedQuery = searchQuery.trim();
    if (!isSearchVisible && trimmedQuery !== "") {
      updateSearchQuery(trimmedQuery);
    } else if (trimmedQuery !== "") {
      setSearchVisible(true);
      router.push({
        pathname: "/products/all",
        query: { searchQuery: trimmedQuery },
      });
      return;
    }
    setSearchVisible(!isSearchVisible);
  };

  const handleAllPageLinkClick = () => {
    updateSearchQuery("");
    setSearchVisible(false);
    router.push("/products/all");
  };

  const handleAccountModal = () => {
    if (accountModal) {
      setAccountModal(false);
    } else {
      setAccountModal(true);
    }
  };

  const handleOutsideClick = (e) => {
    if (
      accountModal &&
      e.target.closest(".account-modal") === null &&
      e.target.closest(".account") === null
    ) {
      setAccountModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [accountModal]);

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
          <div className="account">
            <Image src={userIcon} alt="Account" onClick={handleAccountModal} />
            <div className={`account-modal ${accountModal ? "active" : ""}`}>
              {user ? (
                <div className="account-info">
                  <div className="account-login">
                    {user.user_metadata.full_name}
                  </div>
                  <Link href={"/account"}>
                    <div className="account-login">Account</div>
                  </Link>
                  <button onClick={handleLogout}>Log out</button>
                </div>
              ) : (
                <div className="account-signup">
                  <Link href={"/login"}>
                    <div className="account-login">Log in</div>
                  </Link>
                  <Link href={"/signup"}>
                    <div className="account-login">Sign up</div>
                  </Link>
                </div>
              )}
            </div>
          </div>
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
