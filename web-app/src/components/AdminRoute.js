import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  let role = "";
  if (!token) {
    return <Navigate to="/login" replace />;
  } else {
    role = jwtDecode(token).role;
    if (role !== "ADMIN") {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default AdminRoute;
