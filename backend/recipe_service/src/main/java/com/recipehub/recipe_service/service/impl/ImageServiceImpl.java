package com.recipehub.recipe_service.service.impl;

import com.recipehub.recipe_service.AWS.AmazonS3Service;
import com.recipehub.recipe_service.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
    private final AmazonS3Service amazonS3Service;
//    private final ProfileRepository profileRepository;

    @Override
    public String uploadImage(MultipartFile file, String folder) throws IOException {
        return amazonS3Service.uploadFile(file, folder);
    }

    @Override
    public void deleteImage(String imageUrl) throws IOException {
        amazonS3Service.deleteFile(imageUrl);
    }

    @Override
    public String getImageUrl(String fileName) {
        return amazonS3Service.getFileUrl(fileName);
    }

//    @Override
//    @Transactional
//    public String uploadUserAvatar(UUID userId, MultipartFile avatar) throws Exception {
//        Profile userProfile = profileRepository.findByUserId(userId)
//                .orElseThrow(() -> new AppException(ErrorCode.PROFILE_NOT_FOUND));
//
//        if (userProfile.getProfileImageUrl() != null) {
//            amazonS3Service.deleteFile(userProfile.getProfileImageUrl());
//        }
//
//        String avatarUrl = amazonS3Service.handleUpload(userId, avatar, "users");
//        userProfile.setProfileImageUrl(avatarUrl);
//        profileRepository.save(userProfile);
//        log.info("Successfully updated profile image for user: {}", userId);
//
//        return avatarUrl;
//    }

    @Override
    @Transactional
    public List<String> uploadRecipeImages(UUID recipeId, List<MultipartFile> imageFiles) throws Exception {
        List<String> imageUrls = new ArrayList<>();

        for (MultipartFile file : imageFiles) {
            String imageUrl = amazonS3Service.handleUpload(recipeId, file, "recipes");
            imageUrls.add(imageUrl);
        }

        return imageUrls;
    }

//    @Override
//    @Transactional
//    public void deleteUserAvatar(UUID userId) throws Exception {
//        Profile profile = profileRepository.findByUserId(userId)
//                .orElseThrow(() -> new AppException(ErrorCode.PROFILE_NOT_FOUND));
//
//        amazonS3Service.deleteFile(profile.getProfileImageUrl());
//        profile.setProfileImageUrl(amazonS3Service.getDefaultUrl("users"));
//        profileRepository.save(profile);
//    }
}