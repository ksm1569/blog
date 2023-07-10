package com.smsoft.blog.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/blog")
public class BlogController {
    @GetMapping("")
    public String getBlog(@AuthenticationPrincipal String userEmail){
        return userEmail;
    }
}
