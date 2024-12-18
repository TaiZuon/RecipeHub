package com.recipehub.comment_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Tắt CSRF nếu bạn đang phát triển API RESTful
                .authorizeRequests()
                .requestMatchers("/api/auth/*").permitAll(); // Thay antMatchers bằng requestMatchers
//                .anyRequest().authenticated(); // Các endpoint khác yêu cầu xác thực
        return http.build();
    }
}
