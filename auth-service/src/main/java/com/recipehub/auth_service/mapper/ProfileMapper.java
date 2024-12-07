package com.recipehub.auth_service.mapper;

import com.recipehub.auth_service.dto.request.ProfileCreationRequest;
import com.recipehub.auth_service.dto.request.UserCreationRequest;
import com.recipehub.auth_service.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    ProfileCreationRequest toProfileCreationRequest(UserCreationRequest request);
}
