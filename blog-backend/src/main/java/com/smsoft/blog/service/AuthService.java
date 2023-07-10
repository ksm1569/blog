package com.smsoft.blog.service;

import com.smsoft.blog.dto.ResponseDto;
import com.smsoft.blog.dto.SignInDto;
import com.smsoft.blog.dto.SignInResponseDto;
import com.smsoft.blog.dto.SignUpDto;
import com.smsoft.blog.entity.UserEntity;
import com.smsoft.blog.repository.UserRepository;
import com.smsoft.blog.security.TokenProvider;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    public AuthService(UserRepository userRepository, TokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
    }

    public ResponseDto<?> SignUp(SignUpDto signUpDto){
        String userEmail = signUpDto.getUserEmail();
        String userPassword = signUpDto.getUserPassword();
        String userPasswordCheck = signUpDto.getUserPasswordCheck();

        //유효성 체크
        try {
            if (userRepository.existsById(userEmail))
                return ResponseDto.setFailed("존재하는 아이디입니다!");
        } catch (Exception e){
            return ResponseDto.setFailed("데이터베이스 에러입니다!");
        }

        if (!userPassword.equals(userPasswordCheck))
            return ResponseDto.setFailed("패스워드가 일치하지 않음!");

        UserEntity userEntity = new UserEntity(signUpDto);

        try {
            userRepository.save(userEntity);
        } catch (Exception e){
            return ResponseDto.setFailed("데이터베이스 에러입니다!");
        }

        return ResponseDto.setSuccess("회원가입 성공", null);
    }

    public ResponseDto<SignInResponseDto> signIn(SignInDto signInDto){
        String userEmail = signInDto.getUserEmail();
        String userPassword = signInDto.getUserPassword();

        try{
            boolean isExist = userRepository.existsByUserEmailAndUserPassword(userEmail, userPassword);
            if (!isExist) return ResponseDto.setFailed("로그인 정보가 일치하지 않습니다!");
        }catch (Exception e){
            return ResponseDto.setFailed("데이터베이스 에러입니다!");
        }

        UserEntity userEntity = null;

        try{
            userEntity = userRepository.findById(userEmail).get();
        }catch (Exception e){
            return ResponseDto.setFailed("데이터베이스 에러입니다!");
        }

        userEntity.setUserPassword("");

        String token = tokenProvider.create(userEmail);
        int exprTime = 1117000;

        SignInResponseDto signInResponseDto = new SignInResponseDto(token, exprTime, userEntity);

        return ResponseDto.setSuccess("로그인 성공!", signInResponseDto);
    }
}
