package com.maker.Smart_To_Do_List.controller;


import com.maker.Smart_To_Do_List.auth.JwtUtil;
import com.maker.Smart_To_Do_List.dto.CreateListRequest;
import com.maker.Smart_To_Do_List.dto.ListDto;
import com.maker.Smart_To_Do_List.service.ListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/list")
public class ListController {

    private final ListService listService;


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
    public ResponseEntity<String> createList(@RequestBody CreateListRequest listDto,
                                             HttpServletRequest request){

        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        String token = authorization.split(" ")[1];
        System.out.println(token);
        listService.createList(
                listDto.getListName(),
                listDto.getSortBy(),
                token
        );

        return ResponseEntity.ok().body("Create List Success!");
    }


//    @RequestMapping(value = "{userId}",method = RequestMethod.GET)
//    public ResponseEntity<ListDto> getToDoListInfo(@PathVariable("userId") final long userId){
//        ListDto list = listService.getList(userId)
//    }
}
