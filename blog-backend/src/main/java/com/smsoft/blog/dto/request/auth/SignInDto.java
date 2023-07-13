package com.smsoft.blog.dto.request.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SignInDto {
    @NotBlank
    private String userEmail;
    @NotBlank
    private String userPassword;
}
