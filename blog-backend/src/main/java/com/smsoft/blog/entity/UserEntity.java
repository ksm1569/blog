package com.smsoft.blog.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "User")
@Table(name = "User")
public class UserEntity {
    @Id
    private String userEmail;
    private String userPassword;
    private String userNickName;
    private String userPhoneNumber;
    private String userAddress;
    private String userProfile;
}
