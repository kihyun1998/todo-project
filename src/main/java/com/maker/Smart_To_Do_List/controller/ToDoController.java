package com.maker.Smart_To_Do_List.controller;

import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/todos")
public class ToDoController {

    @PostMapping
    public ResponseEntity<String> writeTodo(){
        return ResponseEntity.ok().body("할 일 등록 완료");
    }
}
