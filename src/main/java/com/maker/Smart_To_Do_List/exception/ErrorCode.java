package com.maker.Smart_To_Do_List.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    DUPLICATED(HttpStatus.CONFLICT,""),
    NOT_FOUND(HttpStatus.NOT_FOUND,""),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED,""),
    ACCESS_DENIED(HttpStatus.FORBIDDEN,"");


    private HttpStatus httpStatus;
    private String message;
}
