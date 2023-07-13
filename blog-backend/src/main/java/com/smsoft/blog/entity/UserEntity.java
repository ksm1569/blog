package com.smsoft.blog.entity;

import com.smsoft.blog.dto.request.auth.SignUpDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String userNickname;
    private String userPhoneNumber;
    private String userAddress;
    private String userProfile;

    public UserEntity(SignUpDto signUpDto){
            this.userEmail = signUpDto.getUserEmail();
            this.userPassword = signUpDto.getUserPassword();
            this.userNickname = signUpDto.getUserNickname();
            this.userPhoneNumber = signUpDto.getUserPhoneNumber();
            this.userAddress = signUpDto.getUserAddress() + " " + signUpDto.getUserAddressDetail();
    }
}
