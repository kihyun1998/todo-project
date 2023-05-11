package com.maker.Smart_To_Do_List.controller;


import com.maker.Smart_To_Do_List.auth.JwtUtil;
import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.CreateListRequest;
import com.maker.Smart_To_Do_List.dto.ToDoListDto;
import com.maker.Smart_To_Do_List.mapper.ToDoListMapper;
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
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/list")
public class ListController {

    private final ListService listService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Value("${jwt.secret}")
    private String secretKey;


//    @PostMapping("/create")
//    public ResponseEntity<String> createList(@RequestBody CreateListRequest listDto,
//                                             HttpServletRequest request){
//
//        String token = JwtUtil.getTokenByCookie(request);
//        listService.createList(
//                listDto.getListName(),
//                listDto.getSortBy(),
//                token
//        );
//
//        return ResponseEntity.ok().body("Create List Success!");
//    }

    @PostMapping("/create")
    public ResponseEntity<String> createList(@RequestBody CreateListRequest createListDto,
                                             HttpServletRequest request){


        String token = JwtUtil.getToken(request);
        System.out.println(token);
        listService.createList(
                createListDto.getListName(),
                createListDto.getSortBy(),
                token
        );

        return ResponseEntity.ok().body("Create List Success!");
    }


    @GetMapping("/lists")
    public ResponseEntity<?> getToDoList(HttpServletRequest request){
        Long userId = jwtService.getUserId(request);
        List<ToDoList> toDoLists = listService.getToDoList(userId);
        List<ToDoListDto> toDoListDtoLists = ToDoListMapper.convertToDtoList(toDoLists);
        return new ResponseEntity<>(toDoListDtoLists, HttpStatus.OK);
    }

//    @RequestMapping(value = "{userId}",method = RequestMethod.GET)
//    public ResponseEntity<ListDto> getToDoListInfo(@PathVariable("userId") final long userId){
//        ListDto list = listService.getList(userId)
//    }
}
