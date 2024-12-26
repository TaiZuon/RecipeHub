import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const { username, password, fullName, dob, city } = values;

    const formattedDob = moment(dob).format("YYYY-MM-DD");

    const requestData = {
      username,
      password,
      role: "USER",
      fullName,
      dob,
      city,
    };

    try {
      setLoading(true);
      console.log(dob);
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        { username, password, fullName, role: "USER", dob, city }
      );
      // Handle success
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white text-center py-4">
        <Link to="/" className="text-2xl">
          RecipeHub
        </Link>
      </header>
      <main className="flex-grow p-4 max-w-md mx-auto">
        <h1 className="text-center text-2xl mb-4">Đăng ký</h1>
        <form onSubmit={onFinish} className="space-y-4">
          <div>
            <label className="block mb-1">Tên người dùng</label>
            <input
              type="text"
              name="username"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Họ và tên</label>
            <input
              type="text"
              name="fullName"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Ngày sinh</label>
            <input
              type="date"
              name="dob"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Thành phố</label>
            <input
              type="text"
              name="city"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
            disabled={loading}
          >
            Đăng ký
          </button>
        </form>
        <p className="text-center mt-4">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        ©2024 RecipeHub
      </footer>
    </div>
  );
};

export default RegisterPage;