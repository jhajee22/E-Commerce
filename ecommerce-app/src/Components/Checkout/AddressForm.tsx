import {useState} from "react"
import type {AddressFormData} from "../../types/addressForm"
import {getAddressByPincode} from "../../services/addressService";

const AddressForm = () =>{

const [address,setAddress] = useState<AddressFormData>({

fullName:"",
phone:"",
pincode:"",
addressLine:"",
city:"",
state:"",
country:""
});

const [loading,setLoading] = useState(false);
const [pincodeError,setPincodeError] = useState("");

const fetchAddressFromPincode = async (pincode: string) => {
  try {
    setLoading(true);
    setPincodeError("");

    const data = await getAddressByPincode(pincode);

    if (data?.[0]?.Status === "Success" && data?.[0]?.PostOffice?.length > 0) {
      const postOffice = data[0].PostOffice[0];

      setAddress((prev) => ({
        ...prev,
        city: postOffice.District || "",
        state: postOffice.State || "",
        country: postOffice.Country || "",
      }));
    } else {
      setPincodeError("Invalid pincode or no address found");
    }
  } catch (error) {
    console.error("Pincode lookup failed:", error);
    setPincodeError("Unable to fetch address details");
  } finally {
    setLoading(false);
  }
};


const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
const {name,value} = e.target;
if(name === "pincode"){
setPincodeError(""); 
}
setAddress((prev) => ({
  ...prev,
  [name]: value,
}));
if(value.length === 6){
fetchAddressFromPincode(value);
}
if(value.length < 6){
setAddress((prev)=>({
...prev,
city:"",
state:"",
}));

}

};
return (
  <div
    style={{
      border: "1px solid #ddd",
      padding: "20px",
      borderRadius: "8px",
      marginTop: "20px",
    }}
  >
    <h3>Delivery Address</h3>
    <div style={{ marginBottom: "12px" }}>
      <label>Full Name</label>
      <input
        type="text"
        name="fullName"
        value={address.fullName}
        onChange={handleChange}
        placeholder="Enter Full Name"
        style={{ width: "100%", padding: "8px", marginTop: "6px" }}
      />
      <div style={{ marginBottom: "12px" }}>
        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={address.phone}
          onChange={handleChange}
          placeholder="Enter Phone Number"
          style={{ width: "100%", padding: "10px", marginTop: "6px" }}
        />
      </div>
      <div style={{ marginBottom: "12px" }}>
        <label>Pincode</label>
        <input
          type="text"
          name="pincode"
          value={address.pincode}
          onChange={handleChange}
          placeholder="Enter Pincode"
          style={{ width: "100%", padding: "10px", marginTop: "6px" }}
        />
        {loading && (
          <p style={{ fontSize: "12px", color: "gray", marginTop: "6px" }}>
            Fetching city and state...
          </p>
        )}
        {pincodeError && (
          <p style={{ fontSize: "12px", color: "red", marginTop: "6px" }}>
            {pincodeError}
          </p>
        )}
      </div>
      {/* <div style={{ marginBottom: "12px" }}>
        <label>Address Line</label>
        <textarea
          name="addressLine"
          value={address.addressLine}
          onChange={handleChange}
          placeholder="Enter Address Line"
          rows={4}
          style={{ width: "100%", padding: "10px", marginTop: "6px" }}
        />
      </div> */}
      <div style={{ marginBottom: "12px" }}>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={address.city}
          readOnly
          placeholder="City will be auto filled"
          style={{ width: "100%", padding: "10px", marginTop: "6px" }}
        />
      </div>
      <div style={{ marginBottom: "12px" }}>
        <label>State</label>
        <input
          type="text"
          name="state"
          value={address.state}
          readOnly
          placeholder="State will be auto filled "
          style={{ width: "100%", padding: "10px", marginTop: "6px" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={address.country}
          readOnly
          placeholder="Country will be auto filled"
          style={{ width: "100%", padding: "10px", marginTop: "6px" }}
        />
      </div>
    </div>
  </div>
);

}

export default AddressForm;