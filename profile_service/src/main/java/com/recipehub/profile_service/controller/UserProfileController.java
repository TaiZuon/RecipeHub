package com.recipehub.profile_service.controller;

import com.recipehub.profile_service.dto.request.ProfileCreationRequest;
import com.recipehub.profile_service.dto.response.UserProfileResponse;
import com.recipehub.profile_service.service.UserProfileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserProfileController {
    UserProfileService userProfileService;

    @PostMapping("/users")
    UserProfileResponse createProfile(@RequestBody ProfileCreationRequest request) {
        return userProfileService.createProfile(request);
    }

    @GetMapping("/users/{profileId}")
    UserProfileResponse getProfile(@PathVariable Long profileId) {
        return userProfileService.getProfile(profileId);
    }
}