package com.maker.Smart_To_Do_List.controller;


import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.*;
import com.maker.Smart_To_Do_List.service.JwtService;
import com.maker.Smart_To_Do_List.service.ListService;
import com.maker.Smart_To_Do_List.service.UserService;
import com.maker.Smart_To_Do_List.service.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final VerificationService verificationService;

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
    @PostMapping("/join/id")
    public ResponseEntity<?> checkLoginId(@RequestBody CheckLoginIdDto checkLoginIdDto){
        boolean check = verificationService.checkLoginIdDup(checkLoginIdDto.getLoginId());
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @PostMapping("/join/username")
    public ResponseEntity<?> checkUserName(@RequestBody CheckUserNameDto checkUserNameDto){
        boolean check = verificationService.checkUserNameDup(checkUserNameDto.getUserName());
        return new ResponseEntity<>(check, HttpStatus.OK);
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
        UserInfoDto userDto = userService.getInfo(user);
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

        return new ResponseEntity<>("Success", HttpStatus.OK);
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

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }


    @GetMapping("/main")
    public ResponseEntity<?> getMainToDoList(HttpServletRequest request){
        Long userId = jwtService.getUserId(request);
        ShowMainDto showMainDto = userService.getMainToDoListId(userId);

        return new ResponseEntity<>(showMainDto, HttpStatus.OK);
    }


    @PutMapping("/main")
    public ResponseEntity<?> updateMainToDoList (HttpServletRequest request,
                                                 @RequestBody ChangeMainListId changeMainListId){
        Long userId = jwtService.getUserId(request);
        User updateUser = userService.updateMainToDoListId(
                userId,
                changeMainListId);
        return new ResponseEntity<>(updateUser.getMainToDoListId(), HttpStatus.OK);
    }

    @PutMapping("/weight")
    public ResponseEntity<?> updateWeight(HttpServletRequest request,
                                          @RequestBody UpdateWeight updateWeight){
        Long userId = jwtService.getUserId(request);
        WeightDto weightDto = userService.updateWeight(userId,updateWeight);
        return new ResponseEntity<>(weightDto,HttpStatus.OK);
    }
}
