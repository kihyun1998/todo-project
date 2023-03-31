package com.maker.Smart_To_Do_List.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import javax.persistence.Id;

@Configuration
public class SecurityConfig {

    // 그냥 Spring.Security 사용하면 안되기 때문에 상속 받아서 재정의
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .httpBasic().disable() // UI쪽으로 들어오는거 disable
                .csrf().disable() // csrf공격 disable
                .cors().and() // cors 허용
                .authorizeRequests()
                .antMatchers("/api/**").permitAll() // 전체 허용
                .antMatchers("/api/v1/users/join","/api/v1/users/login").permitAll() // 이 부분을 더 허용
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //jwt 사용할 때 씀
                .and()
                .build();
    }
}
