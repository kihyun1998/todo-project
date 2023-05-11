package com.maker.Smart_To_Do_List.controller;

import com.maker.Smart_To_Do_List.dto.CreateToDoRequest;
import com.maker.Smart_To_Do_List.service.ToDoService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/list")
public class ToDoController {

    private final ToDoService toDoService;

    @PostMapping("/{listId}/create")
    public ResponseEntity<String> createTodo(
            @RequestBody CreateToDoRequest createToDoDto,
            @PathVariable("listId") final long listId){

            toDoService.createToDo(
                    createToDoDto,
                    listId
            );

        return ResponseEntity.ok().body("Create ToDo Success");
    }
}
