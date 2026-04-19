import {API_CONFIG} from "../config/apiConfig"


export const getAddressByPincode = async (pincode:string)=>{
const response = await fetch(`${API_CONFIG.PINCODE_LOOKUP_URL}/${pincode}`);
if(!response.ok){
throw new Error("Failed to Fetch Address Details");
}
const data = await response.json();
return data;
};