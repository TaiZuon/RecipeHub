package com.recipehub.auth_service.mapper;

import com.recipehub.auth_service.dto.request.UserCreationRequest;
import com.recipehub.auth_service.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);
}