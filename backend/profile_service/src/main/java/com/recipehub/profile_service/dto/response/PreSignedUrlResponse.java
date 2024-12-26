package com.recipehub.profile_service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PreSignedUrlResponse {
    private String uploadUrl;
    private String fileUrl;
}
