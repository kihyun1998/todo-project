package com.maker.Smart_To_Do_List.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UserDto {
    Long userId;
    String loginId;
    String loginPw;
    String userName;
    Date createdAt;
    String userEmail;
}
