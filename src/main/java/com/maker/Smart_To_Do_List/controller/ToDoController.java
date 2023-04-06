package com.maker.Smart_To_Do_List.controller;

import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/todos")
public class ToDoController {

//     todo service 제작

    @PostMapping
    public ResponseEntity<String> writeTodo(Authentication authentication){
        return ResponseEntity.ok().body(authentication.getName() + "님의 할일 등록 완료");
    }
}
