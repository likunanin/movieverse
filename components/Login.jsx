import { useState } from "react";

function Login() {

const[email,setEmail]=useState("");

const[password,setPassword]=useState("");

const login=(e)=>{

e.preventDefault();

localStorage.setItem("user",email);

alert("Login წარმატებულია");

}

return(

<div className="form">

<h2>Login</h2>

<form onSubmit={login}>

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button>Login</button>

</form>

</div>

)

}

export default Login;