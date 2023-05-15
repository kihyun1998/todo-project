package com.maker.Smart_To_Do_List.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ChangePasswordRequest {
    private String password;
    private String changePassword;
}
