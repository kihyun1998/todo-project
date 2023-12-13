package com.maker.Smart_To_Do_List.controller;



import com.maker.Smart_To_Do_List.dto.ChangeListNameRequest;
import com.maker.Smart_To_Do_List.dto.CreateListRequest;
import com.maker.Smart_To_Do_List.dto.GetListDto;
import com.maker.Smart_To_Do_List.dto.ToDoListDto;
import com.maker.Smart_To_Do_List.service.JwtService;
import com.maker.Smart_To_Do_List.service.ListService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/list")
public class ListController {

    private final ListService listService;
    private final JwtService jwtService;

    
    /**
     * POST
     [createList]: 리스트 생성
     **/
    @PostMapping("/create")
    public ResponseEntity<ToDoListDto> createList(@RequestBody CreateListRequest createListDto,
                                             HttpServletRequest request){

        Long userId = jwtService.getUserId(request);
        ToDoListDto createTodoList = listService.createList(
                createListDto.getListName(),
                userId
        );

        return new ResponseEntity<>(createTodoList, HttpStatus.OK);
    }


    /**
     * GET
     * [getToDoLists]: 모든 리스트 조회
     * **/
    @GetMapping("/lists")
    public ResponseEntity<?> getToDoLists(HttpServletRequest request){
        Long userId = jwtService.getUserId(request);
        List<ToDoListDto> getListDto = listService.getToDoLists(userId);
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

    /**
     * PUT
     * [changeToDoListName]: 투두리스트 이름 변경 API
     * **/
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

    /**
     * Delete
     * [deleteToDoList]: 리스트 삭제
     * **/
    @DeleteMapping("/{listId}")
    public ResponseEntity<Void> deleteToDoList(HttpServletRequest request,
                                               @PathVariable("listId") final long listId) throws IOException{
        Long userId = jwtService.getUserId(request);
        listService.deleteToDoList(
                userId,
                listId
        );
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
