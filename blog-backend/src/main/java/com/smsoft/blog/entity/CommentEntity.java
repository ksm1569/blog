package com.smsoft.blog.entity;

import com.smsoft.blog.dto.request.board.PostCommentDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity(name = "Comment")
@Table(name = "Comment")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentId;
    private int boardNumber;
    private String userEmail;
    private String commentProfile;
    private String commentNickname;
    private String commentWriteDate;
    private String commentContent;

    public CommentEntity(UserEntity userEntity, PostCommentDto postCommentDto){
        Date now = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String writeDate = simpleDateFormat.format(now);

        this.boardNumber = postCommentDto.getBoardNumber();
        this.userEmail = userEntity.getUserEmail();
        this.commentProfile = userEntity.getUserProfile();
        this.commentNickname = userEntity.getUserNickname();
        this.commentWriteDate = writeDate;
        this.commentContent = postCommentDto.getCommentContent();
    }
}
