package com.maker.Smart_To_Do_List.util;

import com.maker.Smart_To_Do_List.domain.RefreshToken;
import com.maker.Smart_To_Do_List.dto.TokenDto;
import com.maker.Smart_To_Do_List.impl.UserDetailsServiceImpl;
import com.maker.Smart_To_Do_List.repository.RefreshTokenRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;

import io.jsonwebtoken.security.Keys;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final UserDetailsServiceImpl userDetailsService;
    private final RefreshTokenRepository refreshTokenRepository;

    private static final long ACCESS_TIME = 60 * 60 * 1000L;  // 1시간
    private static final long REFRESH_TIME = 7 * 24 * 60 * 60 * 1000L; // 일주일


    public static final String ACCESS_TOKEN = "Access_Token";
    public static final String REFRESH_TOKEN = "Refresh_Token";

    @Value("${jwt.secret}")
    private String secretKey;
    private Key key;
    private final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.RS512;


    // init - bean 등록으로 한 번만 실행 / 키 생성
    @PostConstruct
    public void init(){
        byte[] bytes = Base64.getDecoder().decode(secretKey);
        key = Keys.hmacShaKeyFor(bytes);
    }

    public String getHeaderToken(HttpServletRequest request, String type){
        return type.equals("Access") ? request.getHeader(ACCESS_TOKEN) : request.getHeader(REFRESH_TOKEN);
    }

    public TokenDto createAllToken(String loginId){
        return new TokenDto(createToken(loginId, "Access"),createToken(loginId,"Refresh"));
    }

    // 생성
    public String createToken(String loginId, String type){
        Date date = new Date();
        long time = type.equals("Access") ? ACCESS_TIME : REFRESH_TIME;

        return Jwts.builder()
                .setSubject(loginId)
                .setExpiration(new Date(date.getTime()+time))
                .setIssuedAt(date)
                .signWith(signatureAlgorithm, key)
                .compact();
    }

    // 검증
    public Boolean tokenValidation(String token){
        try{
            Jwts.parser().setSigningKey(key).parseClaimsJws(token);
            return true;
        } catch (Exception ex){
            log.error(ex.getMessage());
            return false;
        }
    }
    
    // Refresh 토큰 검증
    // db의 토큰과 비교
    public Boolean refreshTokenValidation(String token){
        if(!tokenValidation(token)) return false;

        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByUserEmail(getLoginIdFromToken(token));
        return refreshToken.isPresent() && token.equals(refreshToken.get().getRefreshToken());
    }

    public Authentication createAuthentication(String email){
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        return new UsernamePasswordAuthenticationToken(userDetails,"",userDetails.getAuthorities());
    }
    
    // 토큰 > email 추출

    public String getLoginIdFromToken(String token){
        return Jwts.parser().setSigningKey(key)
                .parseClaimsJws(token).getBody().getSubject();
    }

    public void setHeaderAccessToken(HttpServletResponse response, String accessToken){
        response.setHeader("Access_Token",accessToken);
    }

    public void setHeaderRefreshToken(HttpServletResponse response, String refreshToken){
        response.setHeader("Refresh_Token",refreshToken);
    }
}
