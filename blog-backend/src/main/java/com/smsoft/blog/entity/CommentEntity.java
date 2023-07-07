package com.smsoft.blog.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity(name = "Comment")
@Table(name = "Table")
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

//    comment_id Int Auto_Increment primary key,
//    board_number INT NOT NULL,
//    user_email VARCHAR(40) NOT NULL,
//    comment_profile text,
//    comment_nickname VARCHAR(30) NOT NULL,
//    comment_write_date date not null,
//    comment_content text not null
}
