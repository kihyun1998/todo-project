package com.maker.Smart_To_Do_List.controller;


import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.ChangePasswordRequest;
import com.maker.Smart_To_Do_List.dto.JoinRequest;
import com.maker.Smart_To_Do_List.dto.LoginRequest;
import com.maker.Smart_To_Do_List.dto.UserDto;
import com.maker.Smart_To_Do_List.mapper.UserMapper;
import com.maker.Smart_To_Do_List.service.JwtService;
import com.maker.Smart_To_Do_List.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

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
}
