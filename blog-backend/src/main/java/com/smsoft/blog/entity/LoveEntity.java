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
@Entity(name = "Love")
@Table(name = "Love")
public class LoveEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int loveId;
    private int boardNumber;
    private String userEmail;
    private String loveUserProfile;
    private String loveUserNickname;

    public LoveEntity(UserEntity userEntity, int boardNumber) {
        this.userEmail = userEntity.getUserEmail();
        this.boardNumber = boardNumber;
        this.loveUserProfile = userEntity.getUserProfile();
        this.loveUserNickname = userEntity.getUserNickname();
    }
}
