package com.recipehub.auth_service.service;

import com.recipehub.auth_service.dto.request.UserCreationRequest;
import com.recipehub.auth_service.dto.response.UserResponse;
import com.recipehub.auth_service.entity.User;
import com.recipehub.auth_service.entity.UserRole;
import com.recipehub.auth_service.mapper.ProfileMapper;
import com.recipehub.auth_service.mapper.UserMapper;
import com.recipehub.auth_service.repository.UserRepository;
import com.recipehub.auth_service.entity.UserStatus; // Import enum UserStatus
import com.recipehub.auth_service.repository.httpClient.ProfileClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final ProfileClient profileClient;
    private final ProfileMapper profileMapper;
    private final UserMapper userMapper;

    public boolean registerUser(UserCreationRequest request) {
        if (userRepository.findByUsername(request.getUsername()) != null) {
            return false; // Username đã tồn tại
        }
        User user = userMapper.toUser(request);
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        try {
            user.setRole(request.getRole());
        } catch (IllegalArgumentException e) {
            return false; // Nếu chuỗi không hợp lệ, trả về false
        }
        user.setStatus(UserStatus.ACTIVE); // Mặc định người dùng có trạng thái là ACTIVE
        user = userRepository.save(user);

        var profileRequest = profileMapper.toProfileCreationRequest(request);
        profileRequest.setUserId(user.getId());

        profileClient.createProfile(profileRequest);
        return true;
    }

    public boolean validateUser(String username, String rawPassword) {
        User user = userRepository.findByUsername(username);
        return user != null && passwordEncoder.matches(rawPassword, user.getPassword());
    }

    // Phương thức getUserId thêm vào
    public String getUserId(String username) {
        User user = userRepository.findByUsername(username);
        return user != null ? String.valueOf(user.getId()) : null;  // Chuyển đổi Long thành String
    }

    public UserResponse getUserById(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user != null ? userMapper.toUserResponse(user) : null;
    }

    // Phương thức lấy thông tin role của người dùng
    public String getUserRole(String username) {
        User user = userRepository.findByUsername(username);
        return user != null ? user.getRole().name() : null; // Trả về tên của enum dưới dạng chuỗi
    }

    public String getUserStatus(String username) {
        User user = userRepository.findByUsername(username);
        return user != null ? user.getStatus().name() : null;
    }

    // Phương thức cấm người dùng
    public boolean banUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            user.setStatus(UserStatus.BANNED); // Cập nhật trạng thái thành BANNED
            userRepository.save(user);
            return true;
        }
        return false; // Không tìm thấy người dùng
    }

    // Phương thức kích hoạt người dùng
    public boolean activateUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            user.setStatus(UserStatus.ACTIVE); // Cập nhật trạng thái thành ACTIVE
            userRepository.save(user);
            return true;
        }
        return false; // Không tìm thấy người dùng
    }

    // Liệt kê tất cả người dùng
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
