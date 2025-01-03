package com.recipehub.profile_service.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.NoArgsConstructor;


@JsonInclude(JsonInclude.Include.NON_NULL) //cái nào null thì ko trả về
@NoArgsConstructor
public class ApiResponse<T> {
    private int code = 1000; // good
    private String message;
    private T data;

    public ApiResponse(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public ApiResponse(String message, T data) {
        this.message = message;
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getResult() {
        return data;
    }

    public void setResult(T result) {
        this.data = data;
    }
}
