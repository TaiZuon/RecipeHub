// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { Card, Button, message } from "antd";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        message.error("Failed to load profile");
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Profile</h2>
      <Card title="Profile Information" style={{ width: 300 }}>
        <p>Email: {user.email}</p>
        <p>Joined: {user.createdAt}</p>
      </Card>
      <div style={{ marginTop: "20px" }}>
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Profile;
