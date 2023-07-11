package com.smsoft.blog.controller;

import com.smsoft.blog.dto.PatchUserDto;
import com.smsoft.blog.dto.PatchUserResponseDto;
import com.smsoft.blog.dto.ResponseDto;
import com.smsoft.blog.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PatchMapping("/")
    public ResponseDto<PatchUserResponseDto> patchUser(@RequestBody PatchUserDto requestBody, @AuthenticationPrincipal String userEmail){
        return userService.patchUser(requestBody, userEmail);
    }
}
