package com.maker.Smart_To_Do_List.repository;

import com.maker.Smart_To_Do_List.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
        Optional<User> findByUserId(String userId);
        Optional<User> findByLoginId(String loginId);
        Optional<User> findByUserName(String userName);
}
