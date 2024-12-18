import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AppHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra token từ localStorage để xác định trạng thái đăng nhập
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // true nếu token tồn tại
  }, []);

  const toggleLogin = () => {
    if (isLoggedIn) {
      // Xử lý đăng xuất
      localStorage.removeItem("authToken");
      navigate("/login");
    }
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="bg-blue-600 text-white flex justify-between items-center p-4">
      <div className="text-2xl">
        <Link to="/" className="text-white no-underline">
          RecipeHub
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white no-underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-white no-underline">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/chat" className="text-white no-underline">
              Chat
            </Link>
          </li>
          <li>
            <button
              onClick={toggleLogin}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;