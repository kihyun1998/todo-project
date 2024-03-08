package com.maker.Smart_To_Do_List.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ToDoListNToDosDto {
    private ToDoListDto todoList;
    private List<ToDoDto> todos;
}
