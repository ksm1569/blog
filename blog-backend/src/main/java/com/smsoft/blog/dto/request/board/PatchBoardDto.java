package com.smsoft.blog.dto.request.board;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PatchBoardDto {
    private int boardNumber;
    private String boardTitle;
    private String boardContent;
    private String boardImage;
}
