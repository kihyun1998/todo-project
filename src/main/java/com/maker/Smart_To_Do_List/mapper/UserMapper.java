package com.maker.Smart_To_Do_List.mapper;

import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.UserDto;

public class UserMapper {
    public static UserDto convertToDto(User user){
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setLoginId(user.getLoginId());
        userDto.setLoginPw(user.getLoginPw());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setUserEmail(user.getUserEmail());
        return userDto;
    }
}
