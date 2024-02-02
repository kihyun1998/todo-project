package com.maker.Smart_To_Do_List.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ToDoDto {
    private String toDoId;
    private String todoTitle;
    private long estimatedTime;
    private LocalDateTime deadline;
    private int difficulty;
    private int importance;
    private int status;
    private LocalDateTime createdDate;
}
