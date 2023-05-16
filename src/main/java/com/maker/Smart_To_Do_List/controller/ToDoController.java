package com.maker.Smart_To_Do_List.controller;

import com.maker.Smart_To_Do_List.domain.ToDo;
import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.dto.CreateToDoRequest;
import com.maker.Smart_To_Do_List.dto.ToDoDto;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.mapper.ToDoMapper;
import com.maker.Smart_To_Do_List.repository.ListRepository;
import com.maker.Smart_To_Do_List.service.JwtService;
import com.maker.Smart_To_Do_List.service.ToDoService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/list")
public class ToDoController {

    private final ToDoService toDoService;
    private final JwtService jwtService;
    private final ListRepository listRepository;

    @PostMapping("/{listId}/create")
    public ResponseEntity<String> createToDo(
            HttpServletRequest request,
            @RequestBody CreateToDoRequest createToDoDto,
            @PathVariable("listId") final long listId){

        Long userId = jwtService.getUserId(request);

            toDoService.createToDo(
                    userId,
                    listId,
                    createToDoDto

            );

        return ResponseEntity.ok().body("Create ToDo Success");
    }

    @GetMapping("/{listId}/todos")
    public ResponseEntity<?> getToDos(
            @PathVariable("listId") final long listId,
            HttpServletRequest request){

        Long userId = jwtService.getUserId(request);

        List<ToDo> todos = toDoService.getToDos(
                userId,
                listId
        );
        List<ToDoDto> toDoDtoList = ToDoMapper.convertToDtoList(todos);
        return new ResponseEntity<>(toDoDtoList, HttpStatus.OK);
    }
}
