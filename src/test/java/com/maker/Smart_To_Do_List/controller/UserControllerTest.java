package com.maker.Smart_To_Do_List.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.maker.Smart_To_Do_List.dto.JoinRequest;
import com.maker.Smart_To_Do_List.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
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
    void join() throws Exception {
        String loginId = "test Id";
        String loginPw = "password";
        String userName = "test Man";
//        Date createdAt = new Date(System.currentTimeMillis());
        String userEmail = "test@test.com";

        mockMvc.perform(post("/api/v1/users/join")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsBytes(new JoinRequest(loginId, loginPw,userName,userEmail))))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Join fail - user name duplication")
    void joinFail() throws Exception {
        String loginId = "test Id";
        String loginPw = "password";
        String userName = "test Man";
//        Date createdAt = new Date(System.currentTimeMillis());
        String userEmail = "test@test.com";

        // RunTimeException Throw 됐다고 가정
        when(userService.join(any(),any(),any(),any()))
                .thenThrow(new RuntimeException("UserID is duplicated!!!"));

        mockMvc.perform(post("/api/v1/users/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(new JoinRequest(loginId, loginPw,userName,userEmail))))
                .andDo(print())
                .andExpect(status().isConflict());
    }

}