package com.maker.Smart_To_Do_List.impl;

import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {

        User user = userRepository.findByLoginId(loginId).orElseThrow(
                () -> new AppException(ErrorCode.NOT_FOUND,loginId+"is not found !")
        );

        UserDetailsImpl userDetails = new UserDetailsImpl();
        userDetails.setUser(user);

        return userDetails;
    }
}
