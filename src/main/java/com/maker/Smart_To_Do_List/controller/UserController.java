package com.maker.Smart_To_Do_List.controller;


import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.*;
import com.maker.Smart_To_Do_List.mapper.ToDoListMapper;
import com.maker.Smart_To_Do_List.mapper.UserMapper;
import com.maker.Smart_To_Do_List.service.JwtService;
import com.maker.Smart_To_Do_List.service.ListService;
import com.maker.Smart_To_Do_List.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final ListService listService;

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody JoinRequest joinDto){

        userService.join(
                joinDto.getLoginId(),
                joinDto.getLoginPw(),
                joinDto.getLoginPwCheck(),
                joinDto.getUserName(),
                joinDto.getUserEmail()
        );

        return ResponseEntity.ok().body("Join is SUCCESS!!!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginDto){
        String token = userService.login(
                loginDto.getLoginId(),
                loginDto.getLoginPw()
        );
        return ResponseEntity.ok().body(token);
    }

    @GetMapping("/info")
    public ResponseEntity<?> getInfo(HttpServletRequest request){
        User user = jwtService.getUser(request);
        UserDto userDto = UserMapper.convertToDto(user);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @PutMapping("/info")
    public ResponseEntity<?> changePassword(HttpServletRequest request,
                                            @RequestBody ChangePasswordRequest changePasswordRequest){
        Long userId = jwtService.getUserId(request);
        User updateUser = userService.changePassword(
                userId,
                changePasswordRequest
        );

        return new ResponseEntity<>(updateUser, HttpStatus.OK);
    }

    @DeleteMapping("/info")
    public ResponseEntity<Void> deleteUser(HttpServletRequest request,
                                           @RequestBody DeleteUserRequest deleteUserRequest){
        Long userId = jwtService.getUserId(request);
        userService.deleteUser(
                userId,
                deleteUserRequest
        );
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/lists")
    public ResponseEntity<?> changeListSortOrder(HttpServletRequest request,
                                                 @RequestBody ChangeListSortOrder changeListSortOrder){
        Long userId = jwtService.getUserId(request);
        User updateUser = userService.changeListSortOrder(
                userId,
                changeListSortOrder
        );
        List<ToDoList> toDoLists = listService.getToDoLists(userId);
        List<ToDoListDto> toDoListDtoList = ToDoListMapper.convertToDtoList(toDoLists);

        return new ResponseEntity<>(toDoListDtoList, HttpStatus.OK);
    }
}
