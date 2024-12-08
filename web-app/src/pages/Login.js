import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", { email, password })
      .then((response) => {
        // Xử lý khi đăng nhập thành công
        console.log("Đăng nhập thành công:", response.data);
      })
      .catch((error) => {
        console.error("Lỗi đăng nhập:", error);
      });
  };

  return (
    <div>
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Đăng Nhập</button>
      </form>
    </div>
  );
}

export default Login;
