// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const CustomerLogin = () => {
 const [form, setForm] = useState({ email: "", password: "" });
 const { login } = useAuth();
 const navigate = useNavigate();

 const handleChange = (e) => {
   setForm({ ...form, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     const res = await fetch(
       `http://localhost:8080/customers?email=${form.email}&password=${form.password}`
     );
     const user = await res.json();

     if (user.length > 0) {
       const userData = { name: user[0].name, email: user[0].email };
       login(userData); 
       navigate("/");
     } else {
       alert("Invalid credentials");
     }
   } catch (error) {
     console.error("Error logging in:", error);
   }
 };

 return (
   <div className="container mt-5" style={{ maxWidth: "500px" }}>
     <h2 className="mb-4 text-center">Customer Login</h2>
     <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
       <div className="mb-3">
         <label className="form-label">Email Address</label>
         <input
           type="email"
           className="form-control"
           name="email"
           onChange={handleChange}
           value={form.email}
           required
         />
       </div>

       <div className="mb-3">
         <label className="form-label">Password</label>
         <input
           type="password"
           className="form-control"
           name="password"
           onChange={handleChange}
           value={form.password}
           required
         />
       </div>

       <button type="submit" className="btn btn-success w-100">
         Login
       </button>
     </form>
   </div>
 );
};

export default CustomerLogin;