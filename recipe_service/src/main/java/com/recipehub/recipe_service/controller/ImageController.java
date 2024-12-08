package com.recipehub.recipe_service.controller;

import com.recipehub.recipe_service.AWS.AmazonS3Service;
import com.recipehub.recipe_service.dto.response.PreSignedUrlResponse;
import com.recipehub.recipe_service.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/images")
@RequiredArgsConstructor
@Slf4j
public class ImageController {

    private final ImageService imageService;
    private final AmazonS3Service amazonS3Service;


    @GetMapping("/presigned-url")
    public ResponseEntity<PreSignedUrlResponse> getPresignedUrl(
            @RequestParam String folder,
            @RequestParam String fileType) {
        try {
            PreSignedUrlResponse response = amazonS3Service.generatePreSignedUrl(folder, fileType);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error generating pre-signed URL: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("folder") String folder) {
        try {
            String imageUrl = imageService.uploadImage(file, folder);
            return ResponseEntity.ok(imageUrl);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to upload image" + e.getMessage());
        }
    }

    @PostMapping("/upload/recipe/{recipeId}")
    public ResponseEntity<List<String>> uploadRecipeImages(
            @PathVariable UUID recipeId,
            @RequestParam("files") List<MultipartFile> files) {
        try {
            List<String> imageUrls = imageService.uploadRecipeImages(recipeId, files);
            return ResponseEntity.ok(imageUrls);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

//    @PostMapping("/upload/avatar/{userId}")
//    public ResponseEntity<String> uploadUserAvatar(
//            @PathVariable UUID userId,
//            @RequestParam("file") MultipartFile file) {
//        try {
//            String avatarUrl = imageService.uploadUserAvatar(userId, file);
//            return ResponseEntity.ok(avatarUrl);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Failed to upload avatar: " + e.getMessage());
//        }
//    }

//    @DeleteMapping("/avatar/{userId}")
//    public ResponseEntity<Void> deleteUserAvatar(@PathVariable UUID userId) {
//        try {
//            imageService.deleteUserAvatar(userId);
//            return ResponseEntity.ok().build();
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().build();
//        }
//    }

    @DeleteMapping
    public ResponseEntity<Void> deleteFile(@RequestParam String fileUrl) {
        try {
            amazonS3Service.deleteFile(fileUrl);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
