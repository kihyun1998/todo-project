package com.maker.Smart_To_Do_List.controller;

import com.maker.Smart_To_Do_List.domain.ToDo;
import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.dto.*;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.mapper.ToDoMapper;
import com.maker.Smart_To_Do_List.repository.ListRepository;
import com.maker.Smart_To_Do_List.service.JwtService;
import com.maker.Smart_To_Do_List.service.ToDoService;
import com.maker.Smart_To_Do_List.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/list")
public class ToDoController {

    private final ToDoService toDoService;
    private final JwtService jwtService;
    private final UserService userService;
    private final ListRepository listRepository;

    /**
     * POST
     [createToDo]:  todo 생성 API
     **/
    @PostMapping("/{listId}/create")
    public ResponseEntity<String> createToDo(HttpServletRequest request,
                                             @RequestBody CreateToDoRequest createToDoDto,
                                             @PathVariable("listId") final long listId){

        // 로그인한 jwt 토큰을 통해 userId 추출
        Long userId = jwtService.getUserId(request);

        // todo 생성함수 호출
        // 실질적인 생성은 todoService의 creatToDo가 한다.
        toDoService.createToDo(
                userId,
                listId,
                createToDoDto

        );

        // 200과 생성 성공을 반환
        // [수정할 사항] 이 때 생성 성공말고 만들어진 ToDo를 반환하는게 좋다.
        return ResponseEntity.ok().body("Create ToDo Success");
    }

    /**
     * GET
     [getToDos]: 특정 list의 todo를 전부 반환
     **/
    @GetMapping("/{listId}/todos")
    public ResponseEntity<?> getToDos(@PathVariable("listId") final long listId,
                                      HttpServletRequest request){
        
        // 로그인한 jwt 토큰을 통해 userId 추출
        Long userId = jwtService.getUserId(request);

        // 반환한 todo들을 todos 리스트에 저장
        List<ToDo> todos = toDoService.getToDos(
                userId,
                listId
        );
        // 원할한 JSON 반호나을 위해 todo객체를 dto로 변환
        List<ToDoDto> toDoDtoList = ToDoMapper.convertToDtoList(todos);

        return new ResponseEntity<>(toDoDtoList, HttpStatus.OK);
    }

    /**
     * PUT
     [updateToDoValue]: todo updateAPI
     [필요 수정 사항]: 영역별로 API를 나눌 필요성이 있음 ex) status 나누고 .. 등등 1버튼 1API
     ex) 타이틀 수정, 마감시간 수정 등..
     **/
    @PutMapping("/{listId}/{todoId}")
    public ResponseEntity<?> updateToDoValue(HttpServletRequest request,
                                             @RequestBody CreateToDoRequest createToDoRequest,
                                             @PathVariable("listId") final long listId,
                                             @PathVariable("todoId") final long toDoId){

        Long userId = jwtService.getUserId(request);

        // updateToDoValue() 안에 리스트-투두 검증 로직있음
        CreateToDoRequest createToDoDto = toDoService.updateToDoValue(
                userId,
                listId,
                toDoId,
                createToDoRequest
        );
        return new ResponseEntity<>(createToDoDto, HttpStatus.OK);
    }

    /**
     * PUT
     [changeStatus]: todo의 상태를 업데이트
     **/
    @PutMapping("/{listId}/{todoId}/status")
    public ResponseEntity<?> changeStatus(HttpServletRequest request,
                                          @RequestBody ChangeStatus changeStatus,
                                          @PathVariable("listId") final long listId,
                                          @PathVariable("todoId") final long toDoId){

        Long userId = jwtService.getUserId(request);

        toDoService.changeStatus(
                userId,
                listId,
                toDoId,
                changeStatus
        );

        return new ResponseEntity<>("Change Success", HttpStatus.OK);

    }

    /**
     * Delete
     [deleteToDo]: todo 제거
     **/
    @DeleteMapping("/{listId}/{todoId}")
    public ResponseEntity<Void> deleteToDo(HttpServletRequest request,
                                           @PathVariable("listId") final long listId,
                                           @PathVariable("todoId") final long toDoId) throws IOException {

        Long userId = jwtService.getUserId(request);
        toDoService.deleteToDo(
                userId,
                listId,
                toDoId
        );

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
