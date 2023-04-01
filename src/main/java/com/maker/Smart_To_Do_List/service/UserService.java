package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import com.maker.Smart_To_Do_List.utils.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    @Value("S{jwt.token.secret}")
    private String key;
    private Long expiroTimeMs = 1000 * 60 * 60l;

    public String join(String loginId, String loginPw, String userName, String userEmail){

        // 1. userName 중복 체크
        userRepository.findByLoginId(loginId)
                .ifPresent(user -> {
                    // 중복이면 RuntimeException throw하고 ExceptionManger로 이동
                    throw new AppException(ErrorCode.LOGIN_ID_DUPLICATED, loginId + " is already exits");
                });

        // 2. save
        User user = User.builder()
                .loginId(loginId)
                .loginPw(encoder.encode(loginPw))
                .userName(userName)
                .userEmail(userEmail)
                .build();

        userRepository.save(user);

        return "SUCCESS";
    }

    public String login(String loginId, String loginPw){
        // NO LOGIN ID
        User selectedUser = userRepository.findByLoginId(loginId)
                .orElseThrow(()->new AppException(ErrorCode.LOGIN_ID_NOT_FOUND, loginId + "is not found!!"));

        // INVALID PASSWORD
        if(!encoder.matches(loginPw,selectedUser.getLoginPw())){
            throw new AppException(ErrorCode.INVALID_PASSWORD, "The password is wrong.");
        }

        // No Exception > token issuance
        String token = JwtTokenUtil.createToken(selectedUser.getLoginId() ,key,expiroTimeMs);


        return token;
    }
}
