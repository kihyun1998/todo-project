package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.ChangePasswordRequest;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import com.maker.Smart_To_Do_List.auth.JwtUtil;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final JwtService jwtService;

    @Value("${jwt.secret}")
    private String secretKey;
    private Long expireTimeMs = 1000 * 60 * 60l;

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

        System.out.println(selectedUser.getLoginPw());
        // INVALID PASSWORD
        if(!encoder.matches(loginPw,selectedUser.getLoginPw())){
            throw new AppException(ErrorCode.INVALID_PASSWORD, "The password is wrong.");
        }

        // No Exception > token issuance
        return JwtUtil.createToken(selectedUser.getLoginId() ,secretKey ,expireTimeMs);
    }

    public User changePassword(Long userId, ChangePasswordRequest changePasswordRequest){

        Optional<User> user = userRepository.findByUserId(userId);
        if (user.isEmpty()){
            throw new AppException(ErrorCode.NOT_FOUND, userId + "is not found!!");
        }

        // INVALID PASSWORD
        User updateUser = user.get();
        if(!encoder.matches(changePasswordRequest.getPassword(),updateUser.getLoginPw())){
            throw new AppException(ErrorCode.INVALID_PASSWORD, "The password is wrong.");
        }

        updateUser.setLoginPw(encoder.encode(changePasswordRequest.getChangePassword()));
        return userRepository.save(updateUser);


    }
}
