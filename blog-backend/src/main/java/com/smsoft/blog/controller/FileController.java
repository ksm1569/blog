package com.smsoft.blog.controller;

import com.smsoft.blog.service.FileService;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/file/upload")
    public String fileUpload(@RequestParam("file")MultipartFile file) {
        String response = fileService.upload(file);

        return response;
    }

    @GetMapping(value="/files/download/{fileName}", produces={MediaType.ALL_VALUE})
    public Resource getFile(@PathVariable("fileName") String fileName){
        Resource response = fileService.download(fileName);

        return response;
    }
}
