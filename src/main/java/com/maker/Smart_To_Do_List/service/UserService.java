package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.*;
import com.maker.Smart_To_Do_List.enums.Gender;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.mapper.UserMapper;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.security.SecurityUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import com.maker.Smart_To_Do_List.auth.JwtUtil;

import javax.naming.AuthenticationException;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final VerificationService verificationService;

    @Value("${jwt.secret}")
    private String secretKey;

    /**
     [join]:        신규 유저의 회원가입 서비스
     loginId:       회원가입 유저 아이디
     loginPw:       회원가입 유저 패스워드
     loginPwCheck:  회원가입 패스워드 확인 (사용자가 패스워드를 실수없이 작성했는지 검증)
     userName:      회원가입 유저 이름
     userEmail:     회원가입 유저 이메일

     기능
     - 패스워드 확인
     - 유저 이름 중복 검증

     return:        "SUCCESS" (String)

     AppException:  유저 이름이 이미 존재하는 경우
                    "패스워드"와 "패스워드 확인"이 다른 경우
     **/
    public String join(String loginId, String loginPw,String loginPwCheck, String userName, String userEmail){

        // 유저 아이디(loginId) 중복 검증
        userRepository.findByLoginId(loginId)
                .ifPresent(user -> {
                    // 중복이면 RuntimeException throw하고 ExceptionManger로 이동
                    throw new AppException(ErrorCode.DUPLICATED, loginId + " is already exits");
                });

        // "패스워드"(loginPw)와 "패스워드 확인"(loginPwCheck)이 다르면 예외처리
        if(!loginPw.equals(loginPwCheck)){
            throw new AppException(ErrorCode.INVALID_PASSWORD, "Password is not match !");
        }

        // Builder를 통해 User 도메인 생성
        // 패스워드(loginPw)는 암호화되어 저장
        // 정렬기준(sortBy)은 날짜(Date), 정렬방식(OrderBy)은 오름차순(ASC)이 기본 값
        User user = User.builder()
                .userId(UUID.randomUUID().toString().replace("-", ""))
                .loginId(loginId)
                .loginPw(encoder.encode(loginPw))
                .userName(userName)
                .userEmail(userEmail)
                .build();

        // DB에 저장
        userRepository.save(user);
        return "SUCCESS";
    }

    /**
     [login]:   유저 로그인 서비스
     loginId:   로그인 아이디
     loginPw:   로그인 패스워드

     return:    TokenDto
     **/
    public TokenDto login(String loginId, String loginPw){
        // 로그인 아이디(loginId)를 통해 유저 조회
        User selectedUser = verificationService.foundUserByLoginId(loginId);

        // 패스워드가 옳바른지 검증
        verificationService.checkPassword(loginPw,selectedUser);

        // Token 생성
        return JwtUtil.createTokenDto(selectedUser.getLoginId(), secretKey);
    }

    /**
     [getInfo]: 유저 정보 조회 서비스
     user:      조회할 유저

     return:    유저 정보 (UserInfoDto)
     **/
    public UserInfoDto getInfo(User user){
        // 유저 도메인 -> 유저 Dto 변환
        return UserMapper.convertToDto(user);
    }

    /**
     [changePassword]:      유저 패스워드 변경 서비스
     userId:                서비스를 이용할 유저의 아이디
     changePasswordRequest: 현재 패스워드와 변경할 패스워드가 담긴 Dto

     return:                유저 (User)

     AppException:          패스워드가 틀린 경우
     **/
    public User changePassword(String userId, ChangePasswordRequest changePasswordRequest){

        // 유저 아이디 검증 및 유저 조회
        User updateUser = verificationService.foundUser(userId);

        // 유저 패스워드가 옳바른지 검증 (verificationService.checkPassword()랑 기능이 같나?)
        if(!encoder.matches(changePasswordRequest.getPassword(),updateUser.getLoginPw())){
            // 틀렸다면 예외처리
            throw new AppException(ErrorCode.INVALID_PASSWORD, "The password is wrong.");
        }

        // 신규 패스워드로 업데이트
        updateUser.setLoginPw(encoder.encode(changePasswordRequest.getChangePassword()));

        // DB에 저장
        return userRepository.save(updateUser);
    }

    /**
     [deleteUser]:      유저 탈퇴 서비스
     userId:            서비스를 이용할 유저의 아이디
     deleteUserRequest: 유저 패스워드가 담긴 Dto
     **/
    public void deleteUser(String userId, DeleteUserRequest deleteUserRequest){
        // 유저 아이디 검증 및 유저 조회
        User selectedUser = verificationService.foundUser(userId);

        // 패스워드가 옳바른지 검증
        verificationService.checkPassword(deleteUserRequest.getLoginPw(),selectedUser);

        // 유저 삭제
        userRepository.deleteById(userId);
    }

    /**
     [getMainToDoListId]:   메인화면에 표시될 ToDoList 조회 서비스
     userId:                서비스를 이용할 유저의 아이디

     return:                메인화면에 표시될 ToDoList의 아이디, 유저 이름이 담긴 Dto (ShowMainDto)
     **/
    public ShowMainDto getMainToDoListId(String userId){
        // 유저 아이디 검증 및 유저 조회
        User selectedUser = verificationService.foundUser(userId);

        // 유저정보에서 유저 이름, 메인화면에 표시될 ToDoList의 아이디를 추출하여 ShowMainDto형태로 변환
        return UserMapper.convertToMain(selectedUser);
    }

    /**
     [updateMainToDoListId]:    메인화면에 표시될 ToDoList 변경 서비스
     userId:                    서비스를 이용할 유저의 아이디
     changeMainListId:          변경할 ToDoList의 아이디

     return:                    유저 (User) (ShowMainDto를 반환하면 어떨까?)
     **/
    public User updateMainToDoListId(String userId, ChangeMainListId changeMainListId){
        // 유저 아이디 검증 및 유저 조회
        User updateUser = verificationService.foundUser(userId);
        
        // 메인화면에 표시될 ToDoList 업데이트
        updateUser.setMainToDoListId(changeMainListId.getMainToDoListId());
        
        // DB에 저장
        return userRepository.save(updateUser);
    }

    /**
     [AuthenticationException]:  AccessToken이 만료됐을 때 RefreshToken으로 AccessToken을 재발급하는 서비스
     refreshToken:               RefreshToken

     return:                    AccessToken
     **/
    public String refresh(String refreshToken) {
        JwtUtil.isExpired(refreshToken, secretKey);
        String accessToken = JwtUtil.createAccessToken(JwtUtil.getLoginId(refreshToken, secretKey), secretKey);

        return accessToken;
    }
}
