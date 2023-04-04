package com.maker.Smart_To_Do_List.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    // 연동 테스트 컨트롤러
    
    @GetMapping("/nowij")
    public String Nowij() {
        return "Spring Boot and React 연동 테스트 \n";
    }

}
