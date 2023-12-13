package com.maker.Smart_To_Do_List.mapper;

import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.dto.GetListDto;
import com.maker.Smart_To_Do_List.dto.SortDto;
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

    public static List<ToDoListDto> convertToDtoList(List<ToDoList> toDoLists){
        return toDoLists.stream().map(ToDoListMapper::convertToDto).collect(Collectors.toList());
    }

    // 삭제 예정
//    public static GetListDto convertToGetListDto(List<ToDoListDto> toDoListDtoList,
//                                                 SortDto sortDto){
//        GetListDto getListDto = new GetListDto();
//        getListDto.setToDoListDto(toDoListDtoList);
//        getListDto.setSortDto(sortDto);
//        return getListDto;
//    }
}
