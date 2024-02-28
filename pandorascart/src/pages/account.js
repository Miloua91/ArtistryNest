import Head from "next/head";
import DialogModal from "@/pages/components/Modal";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useRef, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Account() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [isOpened, setIsOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderLoad, setOrderLoad] = useState(false);
  const [retrievedAddress, setRetrievedAddress] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formValidityMessage, setFormValidityMessage] = useState("");
  const formRef = useRef(null);

  const onProceed = async () => {
    if (formRef.current) {
      const isValid = formRef.current.checkValidity();

      if (!isValid) {
        setFormValidityMessage("Please fill out all required fields.");
        return;
      }

      setFormValidityMessage("");

      const formData = new FormData(formRef.current);

      const addressName = formData.get("address-name");
      const address_1 = formData.get("address-1");
      const address_2 = formData.get("address-2");
      const tel = formData.get("tel");
      const address_city = formData.get("city");
      const address_postcode = formData.get("postcode");
      const address_country = formData.get("country");

      try {
        setRetrievedAddress((prevAddress) => ({
          ...prevAddress,
          0: {
            ...prevAddress[0],
            address_name: addressName,
            address1: address_1,
            address2: address_2,
            phone: tel,
            city: address_city,
            zip_code: address_postcode,
            country: address_country,
          },
        }));

        await supabaseClient
          .from("profiles")
          .update({
            address_name: addressName,
            address1: address_1,
            address2: address_2,
            phone: tel,
            city: address_city,
            zip_code: address_postcode,
            country: address_country,
          })
          .eq("id", user.id);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
          const { data: profiles, error } = await supabaseClient
            .from("profiles")
            .select(
              "address_name, address1, address2, phone, city, zip_code, country"
            )
            .eq("id", user.id);

          if (error) {
            console.error("Error fetching data:", error);
            return;
          }
          setLoading(false);
          setRetrievedAddress(profiles);
        } catch (error) {
          console.error("Unexpected error:", error);
        }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchTransactionID = async () => {
      if (user && user.id != null) {
        try {
          const { data: transaction, error } = await supabaseClient
            .from("orders")
            .select("transaction_id, total_price")
            .eq("user_id", user.id);
          if (error) {
            console.error("Error fetching data:", error);
            return;
          }
          setTransactions(transaction);
          setOrderLoad(true);
        } catch (error) {
          console.error(`Sorry we could not get your orders ${error}`);
        }
      }
    };

    fetchTransactionID();
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    const OrderItems = async () => {
      if (isMounted && transactions && transactions.length > 0) {
        try {
          const transactionIds = transactions.map(
            (transaction) => transaction.transaction_id
          );
          const { data: orders, error } = await supabaseClient
            .from("orders_items")
            .select(
              `id, order_id ( transaction_id, total_price, status ), product_id ( product_name ), quantity, unit_price`
            )
            .in("order_id", transactionIds);
          if (error) {
            console.error("Error fetching data:", error);
            return;
          }

          if (isMounted) {
            setOrders(orders);
            setOrderLoad(true);
          }
        } catch (error) {
          console.error(`Sorry, we could not get your orders: ${error}`);
        }
      }
    };

    OrderItems();

    return () => {
      isMounted = false;
    };
  }, [transactions]);

  const orderMap = {};
  const orderPrice = {};

  orders.forEach((order) => {
    const transactionId = order.order_id.transaction_id;

    if (!orderMap[transactionId]) {
      orderMap[transactionId] = [order];
      orderPrice[transactionId] = order.order_id.total_price;
    } else {
      orderMap[transactionId].push(order);
      orderPrice[transactionId] = order.order_id.total_price;
    }

    if (!orderMap[transactionId].status) {
      orderMap[transactionId].status = order.order_id.status;
    }
  });

  return (
    <>
      <Head>
        <title>Account | ArtistryNest</title>
      </Head>
      <div className="my-account">
        <h1>My Account</h1>
        <hr className="my-account-line" />
        {user && <p>What's up {user.user_metadata.full_name.split(" ")[0]} </p>}
        <div className="my-account-content">
          <div className="my-account-order">
            <h3>My Orders</h3>
            <hr className="order-line" />
            {orderLoad ? ( transactions.length > 0 ? (
                Object.keys(orderMap).map((orderId) => (
                  <div key={orderId} className="orders-transaction">
                    <div className="orders-ref">
                      <div>Refrence | {orderId}</div>
                      <div>Shipping status | {orderMap[orderId].status}</div>
                      <div>Total Price | £{orderPrice[orderId]}</div>
                    </div>
                    <table>
                      <tr className="table-header">
                        <td>Product</td>
                        <td className="cell-center">Quantity</td>
                        <td className="cell-center">Price</td>
                      </tr>
                      {orderMap[orderId].map((order) => (
                        <tr key={order.id} className="orders-items">
                          <td>{order.product_id.product_name}</td>
                          <td className="cell-center">{order.quantity}</td>
                          <td className="cell-center">
                            £{order.unit_price * order.quantity}
                          </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                ))
              ) : (
                <p>No orders yet.</p>
              )
            ) : (
              <div className="orders-transaction">
                <div className="orders-ref">
                  <div>
                    <Skeleton width={"18ch"} height={20} />
                  </div>
                  <div>
                    <Skeleton width={"15ch"} height={20} />
                  </div>
                  <div>
                    <Skeleton width={"12ch"} height={20} />
                  </div>
                </div>
                <table>
                  <thead>
                    <tr className="table-header">
                      <th style={{ textAlign: "start" }}>
                        <Skeleton width={"5ch"} height={20} />
                      </th>
                      <th className="cell-center">
                        <Skeleton width={"5ch"} height={20} />
                      </th>
                      <th className="cell-center">
                        <Skeleton width={"4ch"} height={20} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((index) => (
                      <tr key={index} className="orders-items">
                        <td>
                          <Skeleton width={"8ch"} height={20} />
                        </td>
                        <td className="cell-center">
                          <Skeleton width={"4ch"} height={20} />
                        </td>
                        <td className="cell-center">
                          <Skeleton width={"4ch"} height={20} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="my-account-address">
            <h3>My Address</h3>
            <hr className="address-line" />
            {loading ? (
              <div>
                <Skeleton
                  height={18}
                  width={"50%"}
                  style={{ marginBottom: "3px" }}
                />
                <Skeleton
                  height={18}
                  width={"80%"}
                  style={{ marginBottom: "3px" }}
                />
                <Skeleton
                  height={18}
                  width={"35%"}
                  style={{ marginBottom: "3px" }}
                />
                <Skeleton
                  height={18}
                  width={"30%"}
                  style={{ marginBottom: "3px" }}
                />
                <Skeleton
                  height={18}
                  width={"30%"}
                  style={{ marginBottom: "20px" }}
                />
              </div>
            ) : (
              <>
                {retrievedAddress &&
                retrievedAddress[0] &&
                Object.values(retrievedAddress[0]).some(
                  (value) => value !== null
                ) ? (
                  <p>
                    {retrievedAddress[0].address_name}
                    <br />
                    {retrievedAddress[0].address1}
                    <br />
                    {retrievedAddress[0].address2}
                    <br />
                    {retrievedAddress[0].city}
                    <br />
                    {retrievedAddress[0].zip_code}
                    <br />
                    {retrievedAddress[0].country}
                  </p>
                ) : (
                  <p>Add an address to your account.</p>
                )}
              </>
            )}

            {formValidityMessage && (
              <p style={{ color: "red" }}>{formValidityMessage}</p>
            )}
            <button onClick={() => setIsOpened(true)}>Manage Address</button>
            <DialogModal
              title="Add an address"
              isOpened={isOpened}
              onProceed={onProceed}
              onClose={() => setIsOpened(false)}
            >
              <div className="add-address-modal">
                <form ref={formRef} className="address-form">
                  <div className="address-input">
                    <input
                      type="text"
                      name="address-name"
                      placeholder="Name"
                      required
                    />
                    <input
                      type="text"
                      name="address-1"
                      placeholder="Address 1"
                      required
                    />
                    <input
                      type="text"
                      name="address-2"
                      placeholder="Address 2"
                    />
                    <input type="tel" name="tel" placeholder="Phone number" />
                    <div className="address-city">
                      <input
                        id="address-city"
                        type="text"
                        name="city"
                        placeholder="City"
                        required
                      />
                      <input
                        id="address-postcode"
                        type="text"
                        name="postcode"
                        placeholder="Postcode"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      required
                    />
                  </div>
                </form>
              </div>
            </DialogModal>
          </div>
        </div>
      </div>
    </>
  );
}
