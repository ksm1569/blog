package com.smsoft.blog.entity;

import com.smsoft.blog.dto.request.board.PostBoardDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "Board")
@Table(name = "Board")
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardNumber;
    private String boardTitle;
    private String boardContent;
    private String boardImage;
    private String boardVideo;
    private String boardFile;
    private String boardWriterEmail;
    private String boardWriterProfile;
    private String boardWriterNickname;
    private String boardWriteDate;
    private int boardClickCount;
    private int boardLoveCount;
    private int boardCommentCount;

    public BoardEntity(UserEntity userEntity, PostBoardDto postBoardDto) {
        Date now = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        this.boardTitle = postBoardDto.getBoardTitle();
        this.boardContent = postBoardDto.getBoardContent();
        this.boardImage = postBoardDto.getBoardImgUrl();
        this.boardWriteDate = simpleDateFormat.format(now);
        this.boardClickCount = 0;
        this.boardWriterEmail = userEntity.getUserEmail();
        this.boardWriterNickname = userEntity.getUserNickname();
        this.boardWriterProfile = userEntity.getUserProfile();
        this.boardCommentCount = 0;
        this.boardLoveCount = 0;
    }

    public void increaseViewCount() {
        this.boardClickCount++;
    }

    public void increaseLoveCount() {
        this.boardLoveCount++;
    }
    public void decreaseLoveCount() {
        this.boardLoveCount--;
    }
    public void increaseCommentCount() {
        this.boardCommentCount++;
    }
}
