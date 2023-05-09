package com.maker.Smart_To_Do_List.controller;


import com.maker.Smart_To_Do_List.dto.CreateListRequest;
import com.maker.Smart_To_Do_List.service.ListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/list")
public class ListController {

    private final ListService listService;


    @PostMapping("/create")
    public ResponseEntity<String> createList(@RequestBody CreateListRequest createListDto,
                                             HttpServletRequest request){

        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        String token = authorization.split(" ")[1];
        System.out.println(token);
        listService.createList(
                createListDto.getListName(),
                createListDto.getSortBy(),
                token
        );

        return ResponseEntity.ok().body("Create List Success!");
    }

//    @RequestMapping(value = "{userId}",method = RequestMethod.GET)
//    public ResponseEntity<ListDto> getToDoListInfo(@PathVariable("userId") final long userId){
//        ListDto list = listService.getList(userId)
//    }
}
