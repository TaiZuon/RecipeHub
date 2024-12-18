package com.recipehub.comment_service.repository.httpClient;

import com.recipehub.comment_service.dto.Response.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "auth", url = "${app.services.auth}")
public interface AuthClient {
    @GetMapping("/api/auth/{userId}")
    UserResponse getUserById(@PathVariable("userId") Long userId);
}
