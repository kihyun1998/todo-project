//package com.maker.Smart_To_Do_List.mapper;
//
//import com.maker.Smart_To_Do_List.domain.ToDoList;
//import com.maker.Smart_To_Do_List.dto.ToDoListDto;
//
//public class ToDoListMapper {
//    public static ToDoListDto convertToDto(ToDoList toDoList){
//        ToDoListDto toDoListDto = new ToDoListDto();
//        toDoListDto.setListId(toDoList.getListId());
//        toDoListDto.setListName(toDoList.getListName());
//
//        return toDoListDto;
//    }
//
//    public static ToDoList convertToDomain(ToDoListDto toDoListDto){
//        ToDoList toDoList = ToDoList.builder()
//                .listName(toDoListDto.getListName())
//                .l
//                .build();
//    }
//}
