package com.maker.Smart_To_Do_List.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.maker.Smart_To_Do_List.dto.JoinRequest;
import com.maker.Smart_To_Do_List.dto.LoginRequest;
import com.maker.Smart_To_Do_List.enums.Gender;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    UserService userService;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DisplayName("Join success")
    @WithMockUser
    void join() throws Exception {
        String loginId = "testId";
        String loginPw = "password";
        String userName = "test Man";
        String userEmail = "test@test.com";
        String loginPwCheck = "password";
        String userJob = "Student";
        int userAge = 25;
        Gender userGender = Gender.MALE;

        mockMvc.perform(post("/api/v1/users/join")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(new JoinRequest(loginId, loginPw, loginPwCheck,userName,userEmail, userAge, userJob, userGender))))
                        .andDo(print())
                        .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Join fail - loginId duplication")
    @WithMockUser
    void joinFail() throws Exception {
        String loginId = "testId";
        String loginPw = "password";
        String userName = "test Man";
        String userEmail = "test@test.com";
        String loginPwCheck = "password";
        String userJob = "Student";
        int userAge = 25;
        Gender userGender = Gender.MALE;

        // RunTimeException Throw 됐다고 가정
        when(userService.join(any(),any(),any(),any(),any()))
                .thenThrow(new RuntimeException("UserID is duplicated!!!"));

        mockMvc.perform(post("/api/v1/users/join")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(new JoinRequest(loginId, loginPw, loginPwCheck,userName,userEmail, userAge, userJob, userGender))))
                .andDo(print())
                .andExpect(status().isConflict());
    }


    @Test
    @DisplayName("Login - Success")
    @WithMockUser
    void login() throws Exception{
        String loginId = "testId";
        String loginPw = "password";

        when(userService.login(any(),any()))
                .thenReturn("token");

        mockMvc.perform(post("/api/v1/users/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(new LoginRequest(loginId, loginPw))))
                .andDo(print())
                .andExpect(status().isOk());

    }


    @Test
    @DisplayName("Login - Fail(NO ID)")
    @WithMockUser
    void login_fail1() throws Exception{
        String loginId = "testId";
        String loginPw = "password";

        when(userService.login(any(),any()))
                .thenThrow(new AppException(ErrorCode.NOT_FOUND,""));

        mockMvc.perform(post("/api/v1/users/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(new LoginRequest(loginId, loginPw))))
                .andDo(print())
                .andExpect(status().isNotFound());
    }
    @Test
    @DisplayName("Login - Fail(INCORRECT PWD)")
    @WithMockUser

    void login_fail2() throws Exception{
        String loginId = "testId";
        String loginPw = "password";

        when(userService.login(any(),any()))
                .thenThrow(new AppException(ErrorCode.INVALID_PASSWORD,""));

        mockMvc.perform(post("/api/v1/users/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(new LoginRequest(loginId, loginPw))))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }



}