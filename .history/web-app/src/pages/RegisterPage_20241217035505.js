import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    const { username, password, fullName, dob, city } = values;
    const formattedDob = moment(dob).format("YYYY-MM-DD");

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        { username, password, fullName, role: "ADMIN", dob: formattedDob, city }
      );

      alert("Đăng ký thành công!");
      console.log("Response: ", response.data);
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Đăng ký không thành công!";
      alert(errorMessage);
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white text-center py-4">
        <h1 className="text-2xl font-semibold">
          <Link to="/">RecipeHub</Link>
        </h1>
      </header>

      {/* Form */}
      <main className="flex-grow flex items-center justify-center">
        <form
          onSubmit={onFinish}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký</h2>

          {/* Tên người dùng */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Tên người dùng
            </label>
            <input
              type="text"
              name="username"
              placeholder="Ví dụ: nguyen.duong"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mật khẩu */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Họ tên */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Họ tên
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Ví dụ: Nguyễn Thái Dương"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Ngày sinh */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Ngày tháng năm sinh
            </label>
            <input
              type="date"
              name="dob"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Thành phố */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Thành phố
            </label>
            <input
              type="text"
              name="city"
              placeholder="Ví dụ: Hà Nội"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Nút Đăng ký */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>

          {/* Link Đăng nhập */}
          <div className="mt-4 text-center">
            <p>
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Đăng nhập
              </Link>
            </p>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4">
        <p>©2024 RecipeHub</p>
      </footer>
    </div>
  );
};

export default RegisterPage;
