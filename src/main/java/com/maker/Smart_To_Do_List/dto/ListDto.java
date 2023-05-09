package com.maker.Smart_To_Do_List.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ListDto {
    private String listName;
    private String sortBy;
}
