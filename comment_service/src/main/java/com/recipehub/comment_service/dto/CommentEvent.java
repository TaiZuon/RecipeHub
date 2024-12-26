package com.recipehub.comment_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentEvent {
    private String recipe;
    private Object data;
}