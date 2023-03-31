package com.maker.Smart_To_Do_List.controller;


import com.maker.Smart_To_Do_List.dto.JoinRequest;
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

        userService.join(joinDto.getUserName(), joinDto.getPassword());
        return ResponseEntity.ok().body("Join is SUCCESS!!!");
    }
}
