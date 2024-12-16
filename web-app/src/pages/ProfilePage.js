import React, { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";
import { jwtDecode } from "jwt-decode";
import { getProfile, updateProfile } from "../service/userService";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    city: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const profileId = decodedToken.sub;

      try {
        const response = await getProfile(profileId);
        setProfile(response.data);
        setFormData({
          fullName: response.data.fullName,
          dob: response.data.dob,
          city: response.data.city,
        });
      } catch (error) {
        alert("Không thể tải dữ liệu hồ sơ!");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (!profile) {
    return <p>Không tìm thấy hồ sơ!</p>;
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    const decodedToken = jwtDecode(token);
    const profileId = decodedToken.sub;

    try {
      const response = await updateProfile(profileId, formData);
      setProfile(response.data);
      alert("Hồ sơ đã được cập nhật thành công!");
      setIsModalVisible(false);
    } catch (error) {
      alert("Không thể cập nhật hồ sơ!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <AppHeader />

      {/* Content */}
      <main className="flex-grow p-6 max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-xl font-bold mb-4">Hồ sơ của tôi</h1>
          <p>
            <strong className="font-semibold">Tên người dùng:</strong> {profile.fullName}
          </p>
          <p>
            <strong className="font-semibold">Ngày sinh:</strong> {profile.dob}
          </p>
          <p>
            <strong className="font-semibold">Thành phố:</strong> {profile.city}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={showModal}
          >
            Chỉnh sửa hồ sơ
          </button>
        </div>
      </main>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-bold mb-4">Chỉnh sửa hồ sơ</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Tên người dùng
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                  Ngày tháng năm sinh
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Thành phố
                </label>
                <textarea
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        ©2024 RecipeHub
      </footer>
    </div>
  );
};

export default ProfilePage;
