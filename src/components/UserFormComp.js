import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { asset } from "../assets/asset";
import '../styles/Search.css'

const BASE_URL = "http://localhost:8080/users";

  const UserFormComp = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/${editingId}`, data);
      } else {
        await axios.post(BASE_URL, data);
      }
      reset();
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (user) => {
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("password", user.password);
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const filteredUser = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

    const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
    <div className="container">
      {/* <div className="col-md-4">
        <input
          type = "text"
          placeholder="Search by name or email..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div> */}
        <div class="row justify-content-center py-3">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="search-container position-relative">
                    <form class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="search-icon feather feather-search">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                          <input
                          // type = "text"
                          placeholder="Search by name or email..."
                          class="form-control search-input ps-5" type="search"
                          aria-label="Search"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
        />
                        <button class="btn btn-primary ms-2 rounded-pill hover shadow" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
      <h2 className="text-center mb-4">
        {editingId ? "Edit User" : "Add User"}
      </h2>

      <div className="row">
        {/* Form */}
        <div className="col-md-4 form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                placeholder="Enter the name...."
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                {...register("name", {
                  required: "Name is required",
                                pattern: {
                value: /^[a-zA-Z\s]{5,15}$/,
                message: "Username must be 5 to 15 characters long"
              }
                })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="Enter the email..."
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-3 position-relative">
              <label className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter the password..."
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "80%",
                  right: "10px",
                  transform: "translateY(-80%)",
                  cursor: "pointer",
                  color: "#888",
                }}
              ></i>
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              {editingId ? "Update User" : "Add User"}
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="col-md-8">
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUser.slice(startIndex, startIndex+itemsPerPage).map((user) => (
                <tr key={user.id}>
                  <td>
                    <Link
                      to={`/users/${user.id}`}
                      className="text-decoration-none"
                    >
                      {user.name}
                    </Link>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(user)}
                      className="btn btn-sm me-2"
                    >
                      <img src={asset.edit_icon} alt="Edit" width={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-sm"
                    >
                      <img src={asset.delete_icon} alt="Delete" width={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
              <div className="d-flex justify-content-center align-items-center mt-4">
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  <img src={asset.backward_icon} alt="Backward" width={20} />
                </button>
                <span className="mx-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-outline-secondary ms-2"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  <img src={asset.forward_icon} alt="Next" width={20} />
                </button>
              </div>
      </div>
    </div>
    </>
  );
};

export default UserFormComp;
