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

    /**
     * POST
     [join]:        회원가입 API

     * RequestBody
     joinDto:       회원가입 시 필요한 정보가 담긴 Dto

     * Response
     HTTP Status:   200 (OK)
     String:        회원가입 성공 Text
     **/
    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody JoinRequest joinDto){

        // 회원가입 서비스
        userService.join(
                joinDto.getLoginId(),
                joinDto.getLoginPw(),
                joinDto.getLoginPwCheck(),
                joinDto.getUserName(),
                joinDto.getUserEmail()
        );

        return ResponseEntity.ok().body("Join is SUCCESS!!!");
    }

    /**
     * POST
     [checkLoginId]:    회원가입 절차 중, 유저 아이디 중복 검사 API

     * RequestBody
     checkLoginIdDto:   회원가입 유저 아이디가 담긴 Dto

     * Response
     HTTP Status:       200 (OK)
     ?:                 유저 아이디 중복 검사 결과 ([수정할 사항]  <?>로 돼있지만, <Boolean>으로 바꿔도 될 듯?)
     **/
    @PostMapping("/join/id")
    public ResponseEntity<?> checkLoginId(@RequestBody CheckLoginIdDto checkLoginIdDto){
        // 유저 아이디 중복 검사
        boolean check = verificationService.checkLoginIdDup(checkLoginIdDto.getLoginId());

        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    /**
     * POST
     [checkUserName]:   회원가입 절차 중, 유저 이름 중복 검사 API

     * RequestBody
     checkUserNameDto:  회원가입 유저 이름이 담긴 Dto

     * Response
     HTTP Status:       200 (OK)
     ?:                 유저 이름 중복 검사 결과 ([수정할 사항]  <?>로 돼있지만, <Boolean>으로 바꿔도 될 듯?)
     **/
    @PostMapping("/join/username")
    public ResponseEntity<?> checkUserName(@RequestBody CheckUserNameDto checkUserNameDto){
        // 유저 이름 중복 검사
        boolean check = verificationService.checkUserNameDup(checkUserNameDto.getUserName());

        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    /**
     * POST
     [login]:       로그인 API

     * RequestBody
     loginDto:      로그인에 필요한 정보가 담긴 Dto

     * Response
     HTTP Status:   200 (OK)
     String:        Access Token ([수정할 사항]  Refresh Token구현이 되면, Token Dto를 새로 만들어야 할 듯)
     **/
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginDto){

        // 로그인 서비스
        String token = userService.login(
                loginDto.getLoginId(),
                loginDto.getLoginPw()
        );

        return ResponseEntity.ok().body(token);
    }

    /**
     * GET
     [getInfo]:     유저 정보 조회 API

     request:       요청

     * Response
     HTTP Status:   200 (OK)
     ?:             유저 정보 ([수정할 사항]  <?>로 돼있지만, <UserDto>로 바꿔도 될 듯?)
     **/
    @GetMapping("/info")
    public ResponseEntity<?> getInfo(HttpServletRequest request){
        // 요청 헤더에 담긴 Access Token을 통해 유저 조회
        User user = jwtService.getUser(request);

        // 조회된 유저에서 유저 정보를 추출해 Dto로 생성
        UserInfoDto userDto = userService.getInfo(user);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    /**
     * PUT
     [changePassword]:      패스워드 변경 API

     request:               요청

     * RequestBody
     changePasswordRequest: 현재 패스워드와 변경할 패스워드가 담긴 Dto

     * Response
     HTTP Status:           200 (OK)
     ?:                     패스워드 변경 성공 Text ([수정할 사항]  <?>로 돼있지만, <String>으로 바꿔도 될 듯?)
     **/
    @PutMapping("/info")
    public ResponseEntity<?> changePassword(HttpServletRequest request,
                                            @RequestBody ChangePasswordRequest changePasswordRequest){
        // 요청 헤더에 담긴 Access Token을 통해 유저 조회
        Long userId = jwtService.getUserId(request);

        // 패스워드 변경 서비스
        User updateUser = userService.changePassword(
                userId,
                changePasswordRequest
        );

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    /**
     * DELETE
     [deleteUser]:      유저 탈퇴 API

     request:           요청

     * RequestBody
     deleteUserRequest: 탈퇴할 유저의 패스워드가 담긴 Dto

     * Response
     HTTP Status:       404 (NOT_FOUND)
     **/
    @DeleteMapping("/info")
    public ResponseEntity<Void> deleteUser(HttpServletRequest request,
                                           @RequestBody DeleteUserRequest deleteUserRequest){
        // 요청 헤더에 담긴 Access Token을 통해 유저 조회
        Long userId = jwtService.getUserId(request);

        // 유저 탈퇴 서비스
        userService.deleteUser(
                userId,
                deleteUserRequest
        );

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * PUT
     [changeListSortOrder]: 정렬 기준 및 방식 변경 API

     request:               요청

     * RequestBody
     changeListSortOrder:   변경할 정렬 기준 및 방식이 담긴 API

     * Response
     HTTP Status:           200 (OK)
     ?:                     변경 성공 Text ([수정할 사항]  <?>로 돼있지만, <String>으로 바꿔도 될 듯?)
     **/
    @PutMapping("/lists")
    public ResponseEntity<?> changeListSortOrder(HttpServletRequest request,
                                                 @RequestBody ChangeListSortOrder changeListSortOrder){
        // 요청 헤더에 담긴 Access Token을 통해 유저 조회
        Long userId = jwtService.getUserId(request);

        // 정렬 기준 및 방식 변경 서비스
        User updateUser = userService.changeListSortOrder(
                userId,
                changeListSortOrder
        );

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    /**
     * GET
     [getMainToDoList]: 메인 ToDoList 조회 API

     request:           요청

     * Response
     HTTP Status:       200 (OK)
     ?:                 메인 ToDoList와 유저이름이 담긴 Dto ([수정할 사항]  <?>로 돼있지만, <ShowMainDto>로 바꿔도 될 듯?)
     **/
    @GetMapping("/main")
    public ResponseEntity<?> getMainToDoList(HttpServletRequest request){
        // 요청 헤더에 담긴 Access Token을 통해 유저 조회
        Long userId = jwtService.getUserId(request);

        // 메인 ToDoList 조회 서비스
        ShowMainDto showMainDto = userService.getMainToDoListId(userId);

        return new ResponseEntity<>(showMainDto, HttpStatus.OK);
    }


    /**
     * PUT
     [updateMainToDoList]:  메인 ToDoList 변경 API

     request:               요청

     * RequestBody
     changeMainListId:      변경할 메인 ToDoList가 담긴 API

     * Response
     HTTP Status:           200 (OK)
     ?:                     메인 TodoList 아이디 ([수정할 사항]  <?>로 돼있지만, <Long>으로 바꿔도 될 듯?)
     **/
    @PutMapping("/main")
    public ResponseEntity<?> updateMainToDoList (HttpServletRequest request,
                                                 @RequestBody ChangeMainListId changeMainListId){
        // 요청 헤더에 담긴 Access Token을 통해 유저 조회
        Long userId = jwtService.getUserId(request);

        // 메인 ToDoList 변경 서비스
        User updateUser = userService.updateMainToDoListId(
                userId,
                changeMainListId);

        return new ResponseEntity<>(updateUser.getMainToDoListId(), HttpStatus.OK);
    }

    /**
     * PUT
     [updateWeight]:    가중치 변경 API

     request:           요청

     * RequestBody
     updateWeight:      변경할 가중치가 담긴 API

     * Response
     HTTP Status:       200 (OK)
     ?:                 변경된 가중치가 담긴 Dto ([수정할 사항] <?>로 돼있지만, <weightDto>로 바꿔도 될 듯?)
     **/
    @PutMapping("/weight")
    public ResponseEntity<?> updateWeight(HttpServletRequest request,
                                          @RequestBody UpdateWeight updateWeight){
        // 요청 헤더에 담긴 Access Token을 통해 유저 조회
        Long userId = jwtService.getUserId(request);

        // 가중치 변경 서비스
        WeightDto weightDto = userService.updateWeight(userId,updateWeight);

        return new ResponseEntity<>(weightDto,HttpStatus.OK);
    }
}
