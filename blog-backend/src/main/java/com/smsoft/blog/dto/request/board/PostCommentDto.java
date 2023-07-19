package com.smsoft.blog.dto.request.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PostCommentDto {
    private int boardNumber;
    private String commentContent;
}
