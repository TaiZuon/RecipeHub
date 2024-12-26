package com.recipehub.auth_service.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    // Tạo khóa an toàn cho HS256
    private final String SECRET_KEY = "mysecretkeymysecretkeymysecretkeymysecretkey"; // Thay đổi key này thành một chuỗi bí mật an toàn

    // Tạo JWT token
    public String generateToken(String userId, String username, String role, String status) {
        return Jwts.builder()
                .setSubject(userId)
                .claim("username", username)
                .claim("role", role) // Thêm thông tin role vào token
                .claim("status", status)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour expiration
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()), SignatureAlgorithm.HS256)  // Sử dụng hmacShaKeyFor
                .compact();
    }

    // Lấy thông tin userId từ token
    public String extractUserId(String token) {
        return Jwts.parserBuilder()  // Sử dụng parserBuilder() thay vì parser()
                .setSigningKey(SECRET_KEY.getBytes()) // Đảm bảo dùng SECRET_KEY đã mã hóa
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Kiểm tra token hợp lệ không
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Lấy ngày hết hạn của token
    private Date extractExpiration(String token) {
        return Jwts.parserBuilder()  // Sử dụng parserBuilder() thay vì parser()
                .setSigningKey(SECRET_KEY.getBytes()) // Đảm bảo dùng SECRET_KEY đã mã hóa
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }

    // Kiểm tra token hợp lệ
    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }

    // Lấy tên người dùng từ token
    public String extractUsername(String token) {
        return Jwts.parserBuilder()  // Sử dụng parserBuilder() thay vì parser()
                .setSigningKey(SECRET_KEY.getBytes()) // Đảm bảo dùng SECRET_KEY đã mã hóa
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("username", String.class);
    }

    // Lấy vai trò (role) của người dùng từ token
    public String extractRole(String token) {
        return Jwts.parserBuilder()  // Sử dụng parserBuilder() thay vì parser()
                .setSigningKey(SECRET_KEY.getBytes()) // Đảm bảo dùng SECRET_KEY đã mã hóa
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class); // Đảm bảo bạn lấy đúng thông tin từ token
    }
}
