package com.smsoft.blog.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

//    board_number INT PRIMARY KEY auto_increment,
//    board_title varchar(200) not null,
//    board_content text not null,
//    board_image text,
//    board_video text,
//    board_file text,
//    board_writer_email varchar(40) not null,
//    board_writer_profile text,
//    board_writer_nickname VARCHAR(30) NOT NULL,
//    board_write_date date not null,
//    board_click_count int default 0,
//    board_like_count int default 0,
//    board_comment_count int default 0
}
