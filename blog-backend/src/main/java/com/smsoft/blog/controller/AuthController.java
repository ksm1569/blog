package com.smsoft.blog.controller;

import com.smsoft.blog.dto.respose.ResponseDto;
import com.smsoft.blog.dto.request.auth.SignInDto;
import com.smsoft.blog.dto.respose.auth.SignInResponseDto;
import com.smsoft.blog.dto.request.auth.SignUpDto;
import com.smsoft.blog.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/signUp")
    public ResponseDto<?> signUp(@RequestBody SignUpDto requestBody){
        ResponseDto<?> result = authService.SignUp(requestBody);
        System.out.println(result);
        return result;
    }

    @PostMapping("/signIn")
    public ResponseDto<SignInResponseDto> signIn(@RequestBody SignInDto requestBody){
        ResponseDto<SignInResponseDto> result = authService.signIn(requestBody);
        return result;
    }
}
