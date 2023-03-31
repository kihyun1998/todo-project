package com.maker.Smart_To_Do_List.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class JoinRequest {
    private String userName;
    private String password;
}