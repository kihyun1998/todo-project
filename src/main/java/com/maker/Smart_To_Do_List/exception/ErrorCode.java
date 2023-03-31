package com.maker.Smart_To_Do_List.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    LOGIN_ID_DUPLICATED(HttpStatus.CONFLICT,""),
    LOGIN_ID_NOT_FOUND(HttpStatus.NOT_FOUND,""),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED,"");


    private HttpStatus httpStatus;
    private String message;
}
