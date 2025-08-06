import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [userId]);

  if (!user) return <p className="mt-4 text-center">Loading user details...</p>;

  return (
    <div className="container mt-4">
      <div className="mt-4 p-4 border bg-light rounded shadow">
        <h4>User Details</h4>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Password:</strong> {user.password}
        </p>
      </div>
    </div>
  );
};

export default UserDetail;
