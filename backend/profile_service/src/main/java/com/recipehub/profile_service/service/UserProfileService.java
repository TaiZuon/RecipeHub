package com.recipehub.profile_service.service;

import com.recipehub.profile_service.dto.request.ProfileCreationRequest;
import com.recipehub.profile_service.dto.response.UserProfileResponse;

import java.util.UUID;

public interface UserProfileService {
    public UserProfileResponse createProfile(ProfileCreationRequest request);

    public UserProfileResponse getProfile(Long userId);

    UserProfileResponse updateProfile(Long profileId, ProfileCreationRequest request);

}
