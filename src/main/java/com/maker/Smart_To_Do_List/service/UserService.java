package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.domain.RefreshToken;
import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.GlobalResDto;
import com.maker.Smart_To_Do_List.dto.TokenDto;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.repository.RefreshTokenRepository;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import com.maker.Smart_To_Do_List.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final BCryptPasswordEncoder encoder;

    @Value("${jwt.secret}")
    private String key;
    private Long expiroTimeMs = 1000 * 60 * 60l;


    @Transactional
    public GlobalResDto join(String loginId, String loginPw, String loginPwCheck, String userName, String userEmail){

        // 1. userName 중복 체크
        userRepository.findByLoginId(loginId)
                .ifPresent(user -> {
                    // 중복이면 RuntimeException throw하고 ExceptionManger로 이동
                    throw new AppException(ErrorCode.DUPLICATED, loginId + " is already exits");
                });

        // 2. 비밀번호 확인 검사
        if(!loginPw.equals(loginPwCheck)){
            throw new AppException(ErrorCode.INVALID_PASSWORD, "Password is not match !");
        }

        // 3. email 중복 체크
        userRepository.findByUserEmail(userEmail)
                .ifPresent(user -> {
                    throw new AppException(ErrorCode.DUPLICATED, userEmail + "is already exits");
                });

        // 4. save
        User user = User.builder()
                .loginId(loginId)
                .loginPw(encoder.encode(loginPw))  // 비밀번호 암호화
                .userName(userName)
                .userEmail(userEmail)
                .build();

        userRepository.save(user);

        return new GlobalResDto("SUCCESS JOIN", HttpStatus.OK.value()) ;
    }

    @Transactional
    public GlobalResDto login(String loginId, String loginPw, HttpServletResponse response){
        // 아이디 검사
        User loginUser = userRepository.findByLoginId(loginId)
                .orElseThrow(()->new AppException(ErrorCode.NOT_FOUND, loginId + "is not found!!"));

        // 비밀번호 검사
        if(!encoder.matches(loginPw,loginUser.getLoginPw())){
            throw new AppException(ErrorCode.INVALID_PASSWORD, "The password is wrong.");
        }

        // 토큰 생성 (createToken의 return값 수정해야 함)
        TokenDto tokenDto = JwtUtil.createToken(loginUser.getLoginId(), key, expiroTimeMs);

        // Refresh 토큰 확인
        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByUserEmail(loginUser.getUserEmail());

        // refresh token 있으면 업데이트 없으면 생성
        if(refreshToken.isPresent()){
            refreshTokenRepository.save(refreshToken.get().setRefreshToken(tokenDto.getRefreshToken()));
        }else{
            RefreshToken newToken = new RefreshToken(tokenDto.getAccessToken(),loginUser.getUserEmail());
            refreshTokenRepository.save(newToken);
        }

        setHeader(response,tokenDto);

        return new GlobalResDto("Login Success !!",HttpStatus.OK.value());
    }

    private void setHeader(HttpServletResponse response, TokenDto tokenDto){
        response.addHeader(JwtUtil.ACCESS_TOKEN, tokenDto.getAccessToken());
    }
}
