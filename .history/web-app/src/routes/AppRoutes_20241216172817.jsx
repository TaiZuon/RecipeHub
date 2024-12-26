import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import { Chat } from "../pages/chat/Chat";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
                path="/chat"
                element={
                  <PrivateRoute allowedRoles={["BIDDER", "SELLER", "ADMIN"]}>
                    <ChatLayout>
                      <Chat />
                    </ChatLayout>
                  </PrivateRoute>
                }
              />
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;