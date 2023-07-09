package com.smsoft.blog.controller;

import com.smsoft.blog.dto.ResponseDto;
import com.smsoft.blog.dto.SignUpDto;
import com.smsoft.blog.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/signUp")
    public ResponseDto<?> signUp(@RequestBody SignUpDto requestBody){
        ResponseDto<?> result = authService.SignUp(requestBody);
        System.out.println(result);
        return result;
    }
}
