package com.recipehub.profile_service.exception;


import com.recipehub.profile_service.dto.response.ApiResponse;
import com.recipehub.profile_service.exception.AppException;
import com.recipehub.profile_service.exception.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RuntimeException.class) // bắt all bug
    ResponseEntity<ApiResponse> handlingRuntimeException(RuntimeException e){
        ApiResponse response = new ApiResponse();

        response.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode()); //bug
        response.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());

        // Log with appropriate level and include stack trace
        log.error("Unhandled exception occurred: {}", e.getMessage(), e);
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handlingAppException(AppException e){
        ErrorCode errorCode = e.getErrorCode();
        ApiResponse response = new ApiResponse();

        response.setCode(errorCode.getCode()); //bug
        response.setMessage(errorCode.getMessage());

        // Log with appropriate level and include stack trace
        log.error("Unhandled exception occurred: {}", e.getMessage(), e);
        return ResponseEntity.badRequest().body(response);
    }

    // Password / Username validation
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handlingValidition(MethodArgumentNotValidException e){
        String enumKey = e.getFieldError().getDefaultMessage();
        ErrorCode errorCode = ErrorCode.INVALID_KEY;
        try {
            errorCode = ErrorCode.valueOf(enumKey);
        } catch (IllegalArgumentException exception){

        }

        ApiResponse response = new ApiResponse();

        response.setCode(errorCode.getCode()); //bug
        response.setMessage(errorCode.getMessage());

        // Log with appropriate level and include stack trace
        log.error("Unhandled exception occurred: {}", e.getMessage(), e);
        return ResponseEntity.badRequest().body(response);
    }
}
