package com.smsoft.blog.dto.request.board;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class PostBoardDto {
    @NotBlank
    private String boardTitle;
    @NotBlank
    private String boardContent;

    private String boardImage;
}
