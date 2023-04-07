package com.maker.Smart_To_Do_List.controller;

import com.maker.Smart_To_Do_List.service.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest
class ListControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    ListService listService;



}