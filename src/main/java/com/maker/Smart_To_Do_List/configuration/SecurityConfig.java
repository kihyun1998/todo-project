package com.maker.Smart_To_Do_List.configuration;

import com.maker.Smart_To_Do_List.service.UserService;
import com.maker.Smart_To_Do_List.util.JwtUtil;
import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.persistence.Id;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    @Value("${jwt.secret}")
    private String secretKey;

    // 그냥 Spring.Security 사용하면 안되기 때문에 상속 받아서 재정의
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .httpBasic().disable() // UI쪽으로 들어오는거 disable
                .csrf().disable() // csrf공격 disable
                .cors().and() // cors 허용
                .authorizeRequests()
                .antMatchers("/api/v1/users/join","/api/v1/users/login").permitAll() // 토큰 없이 허용
                .anyRequest().authenticated() // 토큰 받아야 허용
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //jwt 사용할 때 씀
                .and()
                .addFilterBefore(new JwtFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
