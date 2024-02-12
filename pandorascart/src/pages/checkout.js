import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "@/context/CartContext";
import { useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import Head from "next/head";

export default function Checkout() {
  const { cart, calculateSubtotal, resetCart } = useCart();
  const user = useUser();
  const { items } = cart;
  const [transaction, setTransaction] = useState();
  const [totalPrice, setTotalPrice] = useState(calculateSubtotal());

  async function insertOrder() {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            transaction_id: transaction,
            user_id: user.id,
            total_price: totalPrice,
          },
        ]),
      });

      /*  if (response.ok) {
        console.log("Your order is pending!");
      } else {
        console.error("Failed to insert order:", response.statusText);
      }
      */
    } catch (error) {
      console.error("Error inserting order:", error);
    }
    try {
      const response = await fetch("/api/order_items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          items.map((item) => ({
            order_id: transaction,
            product_id: item.productId,
            quantity: item.count,
            unit_price: item.price,
          }))
        ),
      });

      if (response.ok) {
        //   console.log("Order items inserted successfully!");
        resetCart();
      } else {
        console.error("Failed to insert order items:", response.statusText);
      }
    } catch (error) {
      console.error("Error inserting order items:", error);
    }
  }

  useEffect(() => {
    if (transaction) {
      insertOrder();
    }
  }, [transaction]);

  if (items.length === 0) {
    return (
      <>
        <div className="checkout">
          <div className="checkout-empty">
            <h1>Your cart is empty</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout | ArtistryNest</title>
      </Head>
      <div className="checkout">
        <div className="checkout-summary">
          <h1>Summary</h1>
          <div className="checkout-cart">
            <div className="checkout-cart-headers">
              <a>Product</a>
            </div>
            <div>
              {items.map((item) => (
                <div key={item.productId} className="checkout-cart-product">
                  <div>
                    <div className="checkout-cart-product-container">
                      <Image
                        src={item.image}
                        alt={item.product_name}
                        width={100}
                        height={150}
                      />
                      <div className="checkout-cart-product-description">
                        <h1>{item.product_name}</h1>
                        <a>£{item.price}</a>
                      </div>
                    </div>
                  </div>
                  <div className="checkout-price-quantity">
                    <p>
                      Quantity
                      <br />
                      {item.count}
                    </p>
                    <p>
                      Total
                      <br />£{item.price * item.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="checkout-pay">
          <h2>Subtotal £{calculateSubtotal()}</h2>
          <PayPalScriptProvider
            options={{
              "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
              currency: "GBP",
              intent: "capture",
            }}
          >
            <PayPalButtons
              createOrder={async () => {
                try {
                  const cart = items.map((item) => ({
                    product_name: item.product_name,
                    id: item.productId,
                    quantity: item.count.toString(),
                    price: item.price,
                    total_price: calculateSubtotal(),
                  }));
                  const response = await fetch("/api/paypal/createorder", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    // use the "body" param to optionally pass additional order information
                    // like product ids and quantities
                    body: JSON.stringify({ cart }),
                  });

                  const orderData = await response.json();

                  if (orderData.id) {
                    return orderData.id;
                  } else {
                    const errorDetail = orderData?.details?.[0];
                    const errorMessage = errorDetail
                      ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                      : JSON.stringify(orderData);

                    throw new Error(errorMessage);
                  }
                } catch (error) {
                  toast.error(`Could not initiate PayPal Checkout...`);
                }
              }}
              onApprove={async (data, actions) => {
                try {
                  const response = await fetch(
                    `/api/paypal/captureorder?orderID=${data.orderID}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  const orderData = await response.json();
                  // Three cases to handle:
                  //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                  //   (2) Other non-recoverable errors -> Show a failure message
                  //   (3) Successful transaction -> Show confirmation or thank you message

                  const errorDetail = orderData?.details?.[0];

                  if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                    // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                    // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                    return actions.restart();
                  } else if (errorDetail) {
                    // (2) Other non-recoverable errors -> Show a failure message
                    throw new Error(
                      `${errorDetail.description} (${orderData.debug_id})`
                    );
                  } else {
                    // (3) Successful transaction -> Show confirmation or thank you message
                    // Or go to another URL:  actions.redirect('thank_you.html');
                    const transaction =
                      orderData.purchase_units[0].payments.captures[0];
                    toast.success(
                      `Transaction ${transaction.status}: ${transaction.id}.`
                    );
                    setTransaction(transaction.id);
                  }
                } catch (error) {
                  toast.error(
                    `Sorry, your transaction could not be processed...`
                  );
                }
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </>
  );
}
