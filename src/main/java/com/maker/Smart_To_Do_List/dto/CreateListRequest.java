package com.maker.Smart_To_Do_List.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CreateListRequest {
    private String listName;
    private String sortBy;
}
