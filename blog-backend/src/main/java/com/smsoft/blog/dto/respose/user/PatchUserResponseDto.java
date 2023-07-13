package com.smsoft.blog.dto.respose.user;

import com.smsoft.blog.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatchUserResponseDto {
    private UserEntity user;
}
