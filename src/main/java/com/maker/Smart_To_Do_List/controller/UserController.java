package com.maker.Smart_To_Do_List.controller;


import com.maker.Smart_To_Do_List.dto.JoinRequest;
import com.maker.Smart_To_Do_List.dto.LoginRequest;
import com.maker.Smart_To_Do_List.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

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
}
