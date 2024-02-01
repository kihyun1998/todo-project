package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.auth.JwtUtil;
import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final UserRepository userRepository;

    // application.properties 내에 정의된 jwt.secret 코드
    @Value("${jwt.secret}")
    private String secretKey;

    /**
     [getUserId]: 요청 헤더에 담긴 Access Token에서 유저 아이디를 추출하고 조회 및 검증하는 서비스
     request: 요청

     return: 유저 아이디 (Long)
     AppException: 유저 정보가 없는 경우
     **/
    public String getUserId(HttpServletRequest request){
        // 요청에서 헤더 추출
        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

        // 헤더에서 Access Token 추출
        String token = authorization.split(" ")[1];

        // Access Token을 복호화하여 유저 아이디 추출
        // -> DB에 유저 검색
        // -> 유저가 없다면 예외 처리
        User user = userRepository.findByLoginId(JwtUtil.getLoginId(token,secretKey))
                .orElseThrow(()->new AppException(ErrorCode.NOT_FOUND,"User is not found!!"));
        return user.getUserId();
    }

    /**
     [getUserId]: 요청 헤더에 담긴 Access Token에서 유저 아이디를 추출하고 조회 및 검증하는 서비스
     request: 요청

     return: 유저 도메인 (User)
     AppException: 유저 정보가 없는 경우
     **/
    public User getUser(HttpServletRequest request){
        // 요청에서 헤더 추출
        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

        // 헤더에서 Access Token 추출
        String token = authorization.split(" ")[1];

        // Access Token을 복호화하여 유저 아이디 추출
        // -> DB에 유저 검색
        // -> 유저가 없다면 예외 처리
        return userRepository.findByLoginId(JwtUtil.getLoginId(token,secretKey))
                .orElseThrow(()->new AppException(ErrorCode.NOT_FOUND,"User is not found!!"));
    }
}
