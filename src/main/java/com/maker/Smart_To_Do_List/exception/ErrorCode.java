package com.maker.Smart_To_Do_List.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    USERNAME_DUPLICATED(HttpStatus.CONFLICT,"");

    private HttpStatus httpStatus;
    private String message;
}
