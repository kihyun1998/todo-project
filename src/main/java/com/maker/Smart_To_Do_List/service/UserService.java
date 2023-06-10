package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.*;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.mapper.UserMapper;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import com.maker.Smart_To_Do_List.auth.JwtUtil;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final VerificationService verificationService;


    @Value("${jwt.secret}")
    private String secretKey;
    private Long expireTimeMs = 1000 * 60 * 24 * 60l;

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
                .sortBy("Date")
                .orderBy("ASC")
                .weight(0.1)
                .build();

        userRepository.save(user);

        return "SUCCESS";
    }

    public String login(String loginId, String loginPw){
        // LoginId Checking
        User selectedUser = verificationService.foundUserByLoginId(loginId);

        // Password Checking
        verificationService.checkPassword(loginPw,selectedUser);

        // No Exception > token issuance
        return JwtUtil.createToken(selectedUser.getLoginId() ,secretKey ,expireTimeMs);
    }

    public UserInfoDto getInfo(User user){
        return UserMapper.convertToDto(user);
    }

    public User changePassword(Long userId, ChangePasswordRequest changePasswordRequest){

        User updateUser = verificationService.foundUser(userId);

        // INVALID PASSWORD
        if(!encoder.matches(changePasswordRequest.getPassword(),updateUser.getLoginPw())){
            throw new AppException(ErrorCode.INVALID_PASSWORD, "The password is wrong.");
        }

        updateUser.setLoginPw(encoder.encode(changePasswordRequest.getChangePassword()));
        return userRepository.save(updateUser);
    }

    public User changeListSortOrder(Long userId, ChangeListSortOrder changeListSortOrder){

        User updateUser = verificationService.foundUser(userId);
        updateUser.setSortBy(changeListSortOrder.getSortBy());
        updateUser.setOrderBy(changeListSortOrder.getOrderBy());
        return userRepository.save(updateUser);
    }

    public void deleteUser(Long userId, DeleteUserRequest deleteUserRequest){
        User selectedUser = verificationService.foundUser(userId);

        // Password Checking
        verificationService.checkPassword(deleteUserRequest.getLoginPw(),selectedUser);
        userRepository.deleteById(userId);
    }

    public ShowMainDto getMainToDoListId(Long userId){
        User selectedUser = verificationService.foundUser(userId);
        return UserMapper.convertToMain(selectedUser);
    }

    public User updateMainToDoListId(Long userId, ChangeMainListId changeMainListId){
        User updateUser = verificationService.foundUser(userId);
        updateUser.setMainToDoListId(changeMainListId.getMainToDoListId());
        return userRepository.save(updateUser);
    }

    public double getWeight(Long userId){
        User selectedUser = verificationService.foundUser(userId);
        return selectedUser.getWeight();
    }

    public WeightDto updateWeight(Long userId, UpdateWeight updateWeight){
        User updateUser = verificationService.foundUser(userId);
        updateUser.setWeight(updateWeight.getWeight());
        User updatedUser = userRepository.save(updateUser);
        return UserMapper.convertToWeight(updatedUser);
    }
}
