package com.maker.Smart_To_Do_List.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CreateListRequest {
    private Long listId;
    private String listName;
}
