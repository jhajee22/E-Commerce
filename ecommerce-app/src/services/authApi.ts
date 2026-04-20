export type LoginPayload = {
username:string;
password:string;
};

export type LoginResponse = {
id:number;
username:string;
email:string;
firstName:string;
lastName:string;
image:string;
accesstoken:string;
refreshtoken:string
}

export const loginUser = async (payload:LoginPayload,):Promise<LoginResponse> =>{
const response = await fetch("https://dummyjson.com/auth/login",{
method:"POST",
headers:{
"Content-Type":"application/json",
},
body: JSON.stringify(payload),
});
const data = await response.json();
if(!response.ok){
throw new Error(data.message || "Login Failed");
}
return data;
}