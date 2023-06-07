package com.maker.Smart_To_Do_List.mapper;

import com.maker.Smart_To_Do_List.domain.ToDo;
import com.maker.Smart_To_Do_List.dto.CreateToDoRequest;
import com.maker.Smart_To_Do_List.dto.ToDoDto;

import java.util.List;
import java.util.stream.Collectors;

public class ToDoMapper {
    public static ToDoDto convertToDto(ToDo toDo){
        ToDoDto toDoDto = new ToDoDto();
        toDoDto.setToDoId(toDo.getToDoId());
        toDoDto.setTodoTitle(toDo.getTodoTitle());
        toDoDto.setEstimatedTime(toDo.getEstimatedTime());
        toDoDto.setDeadline(toDo.getDeadline());
        toDoDto.setDifficulty(toDo.getDifficulty());
        toDoDto.setImportance(toDo.getImportance());
        toDoDto.setNeed(toDo.getNeed());
        toDoDto.setStatus(toDo.getStatus());

        return toDoDto;
    }
    public static List<ToDoDto> convertToDtoList(List<ToDo> toDos){
        return toDos.stream().map(ToDoMapper::convertToDto).collect(Collectors.toList());
    }

    public static CreateToDoRequest convertToToDoRequest(ToDo toDo){
        CreateToDoRequest toDoDto = new CreateToDoRequest();
        toDoDto.setTodoTitle(toDo.getTodoTitle());
        toDoDto.setEstimatedTime(toDo.getEstimatedTime());
        toDoDto.setDeadline(toDo.getDeadline());
        toDoDto.setDifficulty(toDo.getDifficulty());
        toDoDto.setImportance(toDo.getImportance());
        toDoDto.setNeed(toDo.getNeed());
        toDoDto.setStatus(toDo.getStatus());

        return toDoDto;
    }
}
