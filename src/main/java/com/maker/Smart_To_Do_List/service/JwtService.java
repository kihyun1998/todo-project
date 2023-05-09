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
    @Value("${jwt.secret}")
    private String secretKey;

    public Long getUserId(HttpServletRequest request){
        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        String token = authorization.split(" ")[1];
        User user = userRepository.findByLoginId(JwtUtil.getLoginId(token,secretKey))
                .orElseThrow(()->new AppException(ErrorCode.NOT_FOUND,"User is not found!!"));
        return user.getUserId();
    }
}
