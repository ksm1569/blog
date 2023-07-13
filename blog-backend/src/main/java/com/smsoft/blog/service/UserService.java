package com.smsoft.blog.service;

import com.smsoft.blog.dto.request.user.PatchUserDto;
import com.smsoft.blog.dto.respose.user.PatchUserResponseDto;
import com.smsoft.blog.dto.respose.ResponseDto;
import com.smsoft.blog.entity.UserEntity;
import com.smsoft.blog.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseDto<PatchUserResponseDto> patchUser(PatchUserDto requestBody, String userEmail) {
        UserEntity userEntity = null;
        String userNickName = requestBody.getUserNickName();
        String userProfile = requestBody.getUserProfile();

        try {
            userEntity = userRepository.findByUserEmail(userEmail);
            if (userEntity == null){
                return ResponseDto.setFailed("유저정보가 없습니다!");
            }

            userEntity.setUserNickname(userNickName);
            userEntity.setUserProfile(userProfile);

            userRepository.save(userEntity);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("patchUser 실패!");
        }

        userEntity.setUserPassword("");
        PatchUserResponseDto patchUserResponseDto = new PatchUserResponseDto(userEntity);

        return ResponseDto.setSuccess("patchUser 성공!", patchUserResponseDto);
    }
}
