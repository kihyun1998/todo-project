package com.maker.Smart_To_Do_List.dto;

import com.maker.Smart_To_Do_List.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class JoinRequest {
    @NotBlank(message = "아이디를 입력해주세요.")
    private String loginId;

    @NotBlank(message = "패스워드를 입력해주세요.")
    private String loginPw;

    @NotBlank(message = "패스워드 확인 문자를 입력해주세요.")
    private String loginPwCheck;

    @NotBlank(message = "이름을 입력해주세요.")
    @Size(min = 2, message = "이름이 너무 짧습니다.")
    private String userName;

    @NotBlank(message = "이메일을 입력해주세요.")
    private String userEmail;

    @NotBlank(message = "나이를 입력해주세요.")
    @Range(min = 0, max = 150)
    private Integer userAge;

    private String userJob;

    @NotBlank(message = "성별을 선택해주세요.")
    private Gender userGender;
}