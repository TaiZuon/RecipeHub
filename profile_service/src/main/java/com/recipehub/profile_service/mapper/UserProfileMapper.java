package com.recipehub.profile_service.mapper;

import com.recipehub.profile_service.dto.request.ProfileCreationRequest;
import com.recipehub.profile_service.dto.response.UserProfileResponse;
import com.recipehub.profile_service.model.UserProfile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserProfileMapper {
    UserProfile toUserProfile(ProfileCreationRequest request);

    UserProfileResponse toUserProfileReponse(UserProfile entity);
}