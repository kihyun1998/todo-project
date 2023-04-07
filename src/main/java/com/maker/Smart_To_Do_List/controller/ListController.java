package com.maker.Smart_To_Do_List.controller;


import com.maker.Smart_To_Do_List.dto.CreateListRequest;
import com.maker.Smart_To_Do_List.service.ListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/list")
public class ListController {

    private final ListService listService;

    @PostMapping("/create")
    public ResponseEntity<String> createList(@RequestBody CreateListRequest listDto){

        listService.createList(
                listDto.getListName()
        );

        return ResponseEntity.ok().body("Create List Success!");
    }
}
