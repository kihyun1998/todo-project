package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import com.maker.Smart_To_Do_List.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    private final JwtUtil jwtUtil;


    public String join(String loginId, String loginPw,String loginPwCheck, String userName, String userEmail){

        // 1. userName 중복 체크
        userRepository.findByLoginId(loginId)
                .ifPresent(user -> {
                    // 중복이면 RuntimeException throw하고 ExceptionManger로 이동
                    throw new AppException(ErrorCode.DUPLICATED, loginId + " is already exits");
                });

<<<<<<< HEAD
        // 2. 비밀번호 확인 검사 >> front에서 해결하는걸로
//        if(!loginPw.equals(loginPwCheck)){
//            throw new AppException(ErrorCode.INVALID_PASSWORD, "Password is not match !");
//        }
=======
        if(!loginPw.equals(loginPwCheck)){
            throw new AppException(ErrorCode.INVALID_PASSWORD, "Password is not match !");
        }
>>>>>>> parent of 99ae784 (refresh token 사용하는 방안 - 1)

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

<<<<<<< HEAD
    @Transactional
    public GlobalResDto login(String loginId, String loginPw){ // , HttpServletResponse response 보류
        // 아이디 검사
        User loginUser = userRepository.findByLoginId(loginId)
=======
    public String login(String loginId, String loginPw){
        // NO LOGIN ID
        User selectedUser = userRepository.findByLoginId(loginId)
>>>>>>> parent of 99ae784 (refresh token 사용하는 방안 - 1)
                .orElseThrow(()->new AppException(ErrorCode.NOT_FOUND, loginId + "is not found!!"));

        // INVALID PASSWORD
        if(!encoder.matches(loginPw,selectedUser.getLoginPw())){
            throw new AppException(ErrorCode.INVALID_PASSWORD, "The password is wrong.");
        }

<<<<<<< HEAD
        // 토큰 생성 (createToken의 return값 수정해야 함)
        TokenDto tokenDto = jwtUtil.createAllToken(loginUser.getLoginId());
=======
        // No Exception > token issuance
        String token = JwtUtil.createToken(selectedUser.getLoginId() ,key,expiroTimeMs);
>>>>>>> parent of 99ae784 (refresh token 사용하는 방안 - 1)


<<<<<<< HEAD
        // refresh token 있으면 업데이트 없으면 생성
        if(refreshToken.isPresent()){
            RefreshToken updatedToken = refreshToken.get();
            updatedToken.setRefreshToken(tokenDto.getRefreshToken());
            refreshTokenRepository.save(updatedToken);
        }else{
            RefreshToken newToken = RefreshToken.builder()
                    .refreshToken(tokenDto.getAccessToken())
                    .userEmail(loginUser.getUserEmail())
                    .build();
            refreshTokenRepository.save(newToken);
        }
        
        
        //보류
//        setHeader(response,tokenDto);

        return new GlobalResDto("Login Success !!",HttpStatus.OK.value());
    }

    private void setHeader(HttpServletResponse response, TokenDto tokenDto){
        response.addHeader(JwtUtil.ACCESS_TOKEN, tokenDto.getAccessToken());
=======
        return token;
>>>>>>> parent of 99ae784 (refresh token 사용하는 방안 - 1)
    }
}
