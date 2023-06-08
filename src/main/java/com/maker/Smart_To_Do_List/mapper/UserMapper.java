package com.maker.Smart_To_Do_List.mapper;

import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.ShowMainDto;
import com.maker.Smart_To_Do_List.dto.SortDto;
import com.maker.Smart_To_Do_List.dto.UserInfoDto;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserMapper {

    public static UserInfoDto convertToDto(User user){
        UserInfoDto userDto = new UserInfoDto();
        userDto.setLoginId(user.getLoginId());
        userDto.setUserName(user.getUserName());
        userDto.setUserEmail(user.getUserEmail());
        userDto.setWeight(user.getWeight());

        return userDto;
    }

    public static SortDto convertToSort(User user){
        SortDto sortDto = new SortDto();
        sortDto.setSortBy(user.getSortBy());
        sortDto.setOrderBy(user.getOrderBy());
        return sortDto;
    }

    public static ShowMainDto convertToMain(User user){
        ShowMainDto showMainDto = new ShowMainDto();
        showMainDto.setUserName(user.getUserName());
        showMainDto.setMainToDoListId(user.getMainToDoListId());
        return showMainDto;
    }
}
