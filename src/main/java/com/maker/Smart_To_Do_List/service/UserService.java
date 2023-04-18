package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import com.maker.Smart_To_Do_List.util.JwtUtil;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    @Value("${jwt.secret}")
    private String key;
    private Long expiroTimeMs = 1000 * 60 * 60l;

    public String join(String loginId, String loginPw,String loginPwCheck, String userName, String userEmail){

        // 1. userName 중복 체크
        userRepository.findByLoginId(loginId)
                .ifPresent(user -> {
                    // 중복이면 RuntimeException throw하고 ExceptionManger로 이동
                    throw new AppException(ErrorCode.DUPLICATED, loginId + " is already exits");
                });

        if(!loginPw.equals(loginPwCheck)){
            throw new AppException(ErrorCode.INVALID_PASSWORD, "Password is not match !");
        }

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
                .orElseThrow(()->new AppException(ErrorCode.NOT_FOUND, loginId + "is not found!!"));

        // INVALID PASSWORD
        if(!encoder.matches(loginPw,selectedUser.getLoginPw())){
            throw new AppException(ErrorCode.INVALID_PASSWORD, "The password is wrong.");
        }

        // No Exception > token issuance
        String token = JwtUtil.createToken(selectedUser.getLoginId() ,key,expiroTimeMs);


        return token;
    }
}
