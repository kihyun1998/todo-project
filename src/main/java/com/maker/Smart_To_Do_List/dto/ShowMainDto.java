package com.maker.Smart_To_Do_List.dto;

import com.maker.Smart_To_Do_List.domain.ToDoList;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ShowMainDto {
    private String userName;
    private Long mainToDoListId;
}
