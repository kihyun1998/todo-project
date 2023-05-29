package com.maker.Smart_To_Do_List.mapper;

import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.SortDto;
import com.maker.Smart_To_Do_List.dto.UserDto;
import net.bytebuddy.TypeCache;

public class UserMapper {
    public static UserDto convertToDto(User user){
        UserDto userDto = new UserDto();
        userDto.setLoginId(user.getLoginId());
        userDto.setUserName(user.getUserName());
        userDto.setUserEmail(user.getUserEmail());

        return userDto;
    }

    public static SortDto convertToSort(User user){
        SortDto sortDto = new SortDto();
        sortDto.setSortBy(user.getSortBy());
        sortDto.setOrderBy(user.getOrderBy());
        return sortDto;
    }
}
