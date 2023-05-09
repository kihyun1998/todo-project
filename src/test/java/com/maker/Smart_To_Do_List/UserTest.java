package com.maker.Smart_To_Do_List;

import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static com.nimbusds.jwt.util.DateUtils.isAfter;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class UserTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void BaseEntityTest(){
        // given
        LocalDateTime nowTime = LocalDateTime.now();

        User user = User.builder()
                .loginId("test")
                .loginPw("test")
                .userName("test")
                .userEmail("test@test.com")
                .build();

        //when
        userRepository.save(user);

        //then
        assertThat(user
                .getCreatedDate())
                .isAfter(nowTime);

    }
}
