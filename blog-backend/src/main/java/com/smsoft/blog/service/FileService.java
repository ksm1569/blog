package com.smsoft.blog.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class FileService {

    @Value("C:/uploadfiles")
    private String FILE_PATH;

    @Value("http://localhost:4000/files/")
    private String FILE_URL;

    public String upload(MultipartFile file){
        if(file.isEmpty()){
            return null;
        }

        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String uuid = UUID.randomUUID().toString();

        String saveName = uuid + extension;
        String savePath = FILE_PATH + saveName;

        try {
            file.transferTo(new File(savePath));
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }

        String url = FILE_URL + saveName;

        return url;
    }

    public Resource download(String fileName) {

        Resource resource = null;

        try {
            resource = new UrlResource("file:" + FILE_PATH + fileName);
        } catch(Exception exception) {
            exception.printStackTrace();
            return null;
        }

        return resource;
    }
}
