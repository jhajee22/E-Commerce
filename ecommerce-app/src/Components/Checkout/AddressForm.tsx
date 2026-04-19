import {useState} from "react"
import type {AddressFormData} from "../../types/addressForm"
type AddressFormProps = {
  address: AddressFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

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
const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
const {name,value} = e.target;
setAddress((prev)=>({
...prev,
[name]:value,
}));
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
      </div>
      <div style={{ marginBottom: "12px" }}>
        <label>Address Line</label>
        <textarea
          name="addressLine"
          value={address.addressLine}
          onChange={handleChange}
          placeholder="Enter Address Line"
          rows={4}
          style={{ width: "100%", padding: "10px", marginTop: "6px" }}
        />
      </div>
      <div style={{ marginBottom: "12px" }}>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          placeholder="Enter City"
          style={{ width: "100%", padding: "10px", marginTop: "6px" }}
        />
      </div>
      <div style={{ marginBottom: "12px" }}>
        <label>State</label>
        <input
          type="text"
          name="state"
          value={address.state}
          onChange={handleChange}
          placeholder="Enter state"
          style={{ width: "100%", padding: "10px", marginTop: "6px" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={address.country}
          onChange={handleChange}
          placeholder="Enter country"
          style={{ width: "100%", padding: "10px", marginTop: "6px" }}
        />
      </div>
    </div>
  </div>
);

}

export default AddressForm;