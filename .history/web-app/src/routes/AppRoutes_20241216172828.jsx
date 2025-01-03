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
                  
                    <ChatLayout>
                      <Chat />
                    </ChatLayout>
                  
                }
              />
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;