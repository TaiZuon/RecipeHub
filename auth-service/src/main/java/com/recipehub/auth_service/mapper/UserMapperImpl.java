package com.recipehub.auth_service.mapper;

import com.recipehub.auth_service.Enum.UserRole;
import com.recipehub.auth_service.Enum.UserStatus;
import com.recipehub.auth_service.dto.UserDto;
import com.recipehub.auth_service.dto.request.UserCreationRequest;
import com.recipehub.auth_service.dto.response.UserResponse;
import com.recipehub.auth_service.entity.User;
import com.recipehub.auth_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapperImpl {
    @Autowired
    private UserRepository userRepository;

    public UserDto userToUserDto(User user) {
        if (user == null) {
            return null;
        }

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUserName(user.getUsername());
        userDto.setRole(user.getRole());
        userDto.setStatus(user.getStatus());

        return userDto;
    }

    public User toUser(UserCreationRequest request) {
        if (request == null) {
            return null;
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setRole(UserRole.USER);
        user.setStatus(UserStatus.ACTIVE);

        return user;
    }

    public UserResponse toUserResponse(User user) {
        if (user == null) {
            return null;
        }

        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setRole(user.getRole());


        return response;
    }


}
