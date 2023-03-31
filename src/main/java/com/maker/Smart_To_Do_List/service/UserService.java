package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public String join(String loginId, String loginPw, String userName, String userEmail){

        // 1. userName 중복 체크
        userRepository.findByUserName(loginId)
                .ifPresent(user -> {
                    // 중복이면 RuntimeException throw하고 ExceptionManger로 이동
                    throw new AppException(ErrorCode.USERNAME_DUPLICATED, loginId + " is already exits");
                });

        // 2. save
        User user = User.builder()
                .loginId(loginId)
                .loginPw(loginPw)
                .userName(userName)
                .userEmail(userEmail)
                .build();

        userRepository.save(user);

        return "SUCCESS";
    }
}
