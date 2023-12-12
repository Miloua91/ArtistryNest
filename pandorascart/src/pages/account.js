import DialogModal from "@/pages/components/Modal";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useRef, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Account() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [isOpened, setIsOpened] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    address1: "",
    address2: "",
    tel: "",
    city: "",
    postcode: "",
    country: "",
  });
  const [loading, setLoading] = useState(true);
  const [retrievedAddress, setRetrievedAddress] = useState("");
  const [formValidityMessage, setFormValidityMessage] = useState("");
  const formRef = useRef(null);

  const onProceed = async () => {
    if (formRef.current) {
      const isValid = formRef.current.checkValidity();

      if (!isValid) {
        // If the form is not valid, set the feedback message and return
        setFormValidityMessage("Please fill out all required fields.");
        return;
      }

      // Reset the form validity message when the form is valid
      setFormValidityMessage("");

      // Rest of your code for form submission...
      const formData = new FormData(formRef.current);

      const addressName = formData.get("address-name");
      const address_1 = formData.get("address-1");
      const address_2 = formData.get("address-2");
      const tel = formData.get("tel");
      const address_city = formData.get("city");
      const address_postcode = formData.get("postcode");
      const address_country = formData.get("country");

      try {
        const { data, error } = await supabaseClient
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
          );

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
  }, [onProceed]);

  return (
    <>
      <div className="my-account">
        <h1>My Account</h1>
        <hr className="my-account-line" />
        <p>What is up my mokh</p>
        <div className="my-account-content">
          <div className="my-account-order">
            <h3>My Orders</h3>
            <hr className="order-line" />
            <p>No orders yet.</p>
          </div>
          <div className="my-account-address">
            <h3>My Address</h3>
            <hr className="address-line" />
            {loading ? (
              <Skeleton height={120} style={{ marginBottom: "20px" }} />
            ) : retrievedAddress && retrievedAddress.length > 0 ? (
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
