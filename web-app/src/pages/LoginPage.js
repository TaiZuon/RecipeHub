import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  useEffect(() => {
    // Xóa token nếu tồn tại
    localStorage.removeItem("authToken");
  }, []);

  const onFinish = async (e) => {
    e.preventDefault();
    try {
      console.log("Login data:", { username, password });
      // Gửi request đến API đăng nhập
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username,
          password,
        }
      );

      console.log("Login response:", response);

      if (response.status === 200) {
        const token = response.data.token;
        console.log("Token: ", token);
        const status = jwtDecode(token).status;
        console.log("Status: ", status);
        if (status !== "ACTIVE") {
          alert("Tài khoản của bạn đã bị khóa!");
          return;
        } else {
          // Lưu token vào localStorage và chuyển hướng đến trang chính
          localStorage.setItem("authToken", response.data.token);
          alert("Đăng nhập thành công!");
          navigate("/");
        }
      } else {
        alert("Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Đã xảy ra lỗi khi đăng nhập!");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4">
        <div className="text-center text-xl font-bold">
          <Link to="/" className="text-white hover:underline">
            RecipeHub
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-xl font-bold text-center mb-6">Đăng nhập</h1>
          <form onSubmit={onFinish} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Tên người dùng
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tên người dùng"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Mật khẩu"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Đăng nhập
              </button>
            </div>

            <div className="text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:underline font-medium"
              >
                Đăng ký ngay
              </Link>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        ©2024 RecipeHub
      </footer>
    </div>
  );
};

export default LoginPage;
