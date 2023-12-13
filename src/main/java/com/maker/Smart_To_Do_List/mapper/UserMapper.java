package com.maker.Smart_To_Do_List.mapper;

import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.ShowMainDto;
import com.maker.Smart_To_Do_List.dto.UserInfoDto;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserMapper {

    /**
     [convertToDto]: 유저 도메인을 유저 Dto로 변경하는 매퍼
     user:           유저 도메인

     return:         유저정보가 담긴 Dto(UserInfoDto)
     **/
    public static UserInfoDto convertToDto(User user){
        // 유저 Dto 객체 생성
        UserInfoDto userDto = new UserInfoDto();

        // 유저 Dto에 유저 정보 저장 (Builder를 쓰는게 더 좋은 방법일까?)
        userDto.setLoginId(user.getLoginId());
        userDto.setUserName(user.getUserName());
        userDto.setUserEmail(user.getUserEmail());
        //[삭제예정] weight
//        userDto.setWeight(user.getWeight());

        return userDto;
    }

    // [삭제 예정]
//    /**
//     [convertToSort]: 유저 도메인을 정렬정보 Dto로 변경하는 매퍼
//     user:            유저 도메인
//
//     return:          정렬정보가 담긴 Dto(SortDto)
//     **/
//    public static SortDto convertToSort(User user){
//        // 정렬정보 Dto 객체 생성
//        SortDto sortDto = new SortDto();
//
//        // 정렬정보 Dto에 정렬기준과 정렬방식 저장
//        sortDto.setSortBy(user.getSortBy());
//        sortDto.setOrderBy(user.getOrderBy());
//
//        return sortDto;
//    }

    /**
     [convertToMain]: 유저 도메인을 정렬정보 Dto로 변경하는 매퍼
     user:            유저 도메인

     return:          메인에 표시될 ToDoList가 담긴 Dto (ShowMainDto)
     **/
    public static ShowMainDto convertToMain(User user){
        // 메인 ToDoList 객체 생성
        ShowMainDto showMainDto = new ShowMainDto();

        // 메인 ToDoList 객체에 유저 이름과 메인 ToDoList 아이디 저장
        showMainDto.setUserName(user.getUserName());
        showMainDto.setMainToDoListId(user.getMainToDoListId());

        return showMainDto;
    }

    //[삭제 예정]
//    /**
//     [convertToWeight]: 유저 도메인을 가중치정보 Dto로 변경하는 매퍼
//     user:              유저 도메인
//
//     return:            가중치가 담긴 Dto (weightDto)
//     **/
//    public static WeightDto convertToWeight(User user) {
//        // 가중치 Dto 객체 생성
//        WeightDto weightDto = new WeightDto();
//
//        // 가능치 Dto 객체에 유저 이름과 가중치 저장
//        weightDto.setUsername(user.getUserName());
//        weightDto.setWeight(user.getWeight());
//
//        return weightDto;
//    }
}
