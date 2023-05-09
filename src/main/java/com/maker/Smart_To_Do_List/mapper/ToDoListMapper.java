package com.maker.Smart_To_Do_List.mapper;

import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.dto.ToDoListDto;

import java.util.List;
import java.util.stream.Collectors;

public class ToDoListMapper {
    public static ToDoListDto convertToDto(ToDoList toDoList){
        ToDoListDto toDoListDto = new ToDoListDto();
        toDoListDto.setListId(toDoList.getListId());
        toDoListDto.setListName(toDoList.getListName());

        return toDoListDto;
    }

//    public static ToDoList convertToDomain(ToDoListDto toDoListDto){
//        ToDoList toDoList = ToDoList.builder()
//                .listName(toDoListDto.getListName())
//                .l
//                .build();
//    }

    public static List<ToDoListDto> convertToDtoList(List<ToDoList> toDoLists){
        return toDoLists.stream().map(ToDoListMapper::convertToDto).collect(Collectors.toList());
    }
}
