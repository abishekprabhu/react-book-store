import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
 const [form, setForm] = useState({ name: "", email: "", password: "" });
 const navigate = useNavigate();

 const handleChange = (e) => {
   setForm({ ...form, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     const res = await fetch(`http://localhost:8080/customers?email=${form.email}`);
     const existingUsers = await res.json();

     if (existingUsers.length > 0) {
       alert("Email already registered");
       return;
     }
     
     await fetch("http://localhost:8080/customers", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(form)
     });

     alert("Registration successful. Please log in.");
     navigate("/login");
   } catch (error) {
     console.error("Error registering:", error);
   }
 };

 return (
   <div className="container mt-5" style={{ maxWidth: "500px" }}>
     <h2 className="mb-4 text-center">Customer Register</h2>
     <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
       <div className="mb-3">
         <label className="form-label">Full Name</label>
         <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
       </div>

       <div className="mb-3">
         <label className="form-label">Email Address</label>
         <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
       </div>

       <div className="mb-3">
         <label className="form-label">Password</label>
         <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
       </div>

       <button type="submit" className="btn btn-primary w-100">Register</button>
     </form>
   </div>
 );
};

export default Register;