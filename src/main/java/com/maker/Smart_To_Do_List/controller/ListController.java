package com.maker.Smart_To_Do_List.controller;


import com.maker.Smart_To_Do_List.auth.JwtUtil;
import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.ChangeListNameRequest;
import com.maker.Smart_To_Do_List.dto.CreateListRequest;
import com.maker.Smart_To_Do_List.dto.GetListDto;
import com.maker.Smart_To_Do_List.dto.ToDoListDto;
import com.maker.Smart_To_Do_List.mapper.ToDoListMapper;
import com.maker.Smart_To_Do_List.repository.ListRepository;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import com.maker.Smart_To_Do_List.service.JwtService;
import com.maker.Smart_To_Do_List.service.ListService;
import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/list")
public class ListController {

    private final ListService listService;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final ListRepository listRepository;

    @Value("${jwt.secret}")
    private String secretKey;

    @PostMapping("/create")
    public ResponseEntity<String> createList(@RequestBody CreateListRequest createListDto,
                                             HttpServletRequest request){

        Long userId = jwtService.getUserId(request);
        listService.createList(
                createListDto.getListName(),
                userId
        );

        return ResponseEntity.ok().body("Create List Success!");
    }


    @GetMapping("/lists")
    public ResponseEntity<?> getToDoLists(HttpServletRequest request){
        Long userId = jwtService.getUserId(request);
        GetListDto getListDto = listService.getToDoLists(userId);
        return new ResponseEntity<>(getListDto, HttpStatus.OK);
    }

    @GetMapping("/{listId}")
    public ResponseEntity<?> getToDoList(HttpServletRequest request,
                                         @PathVariable("listId") final long listId){
        // 사용자 검증
        Long userId = jwtService.getUserId(request);
        ToDoListDto toDoListDto = listService.getToDoList(
                userId,
                listId
        );
        return new ResponseEntity<>(toDoListDto, HttpStatus.OK);

    }

    @PutMapping("/{listId}")
    public ResponseEntity<?> changeToDoListName(HttpServletRequest request,
                                                @RequestBody ChangeListNameRequest changeListNameRequest,
                                                @PathVariable("listId") final long listId){
        // 사용자 검증
        Long userId = jwtService.getUserId(request);
        ToDoListDto toDoListDto = listService.changeListName(
                userId,
                listId,
                changeListNameRequest
        );
        return new ResponseEntity<>(toDoListDto, HttpStatus.OK);
    }

    @DeleteMapping("/{listId}")
    public ResponseEntity<Void> deleteToDoList(HttpServletRequest request,
                                               @PathVariable("listId") final long listId) throws IOException{
        Long userId = jwtService.getUserId(request);
        listService.deleteToDoList(
                userId,
                listId
        );
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
