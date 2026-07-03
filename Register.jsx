import { useState } from "react";

function Register(){

const[name,setName]=useState("");

const[email,setEmail]=useState("");

const[password,setPassword]=useState("");

const register=(e)=>{

e.preventDefault();

localStorage.setItem("user",email);

alert("Account Created");

}

return(

<div className="form">

<h2>Register</h2>

<form onSubmit={register}>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button>Create Account</button>

</form>

</div>

)

}

export default Register;