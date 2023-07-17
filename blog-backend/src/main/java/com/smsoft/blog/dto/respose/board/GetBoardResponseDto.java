package com.smsoft.blog.dto.respose.board;

import com.smsoft.blog.entity.BoardEntity;
import com.smsoft.blog.entity.CommentEntity;
import com.smsoft.blog.entity.LoveEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetBoardResponseDto {
    private BoardEntity boardEntity;
    private List<CommentEntity> commentEntityList;
    private List<LoveEntity> loveEntityList;
}
