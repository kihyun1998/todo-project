package com.maker.Smart_To_Do_List.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class JoinRequest {
    private String loginId;
    private String loginPw;
    private String loginPwCheck;
    private String userName;
    private String userEmail;
    private String sortBy;
}