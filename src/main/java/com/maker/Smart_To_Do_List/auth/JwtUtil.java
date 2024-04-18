package com.maker.Smart_To_Do_List.auth;

import com.maker.Smart_To_Do_List.dto.TokenDto;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Date;

@Slf4j
public class JwtUtil {

    // AccessToken 만료시간 (30분)
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;

    // RefreshToken 만료시간 (1일)
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24;

    // application.properties 내에 정의된 jwt.secret 코드

    public static String getLoginId(String token, String secretKey){
        return Jwts.parser().setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody().get("loginId",String.class);
    }

    // Token 만료시간 검증
    public static boolean isExpired(String token, String secretKey){
        try{
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return false;
        } catch (ExpiredJwtException e) {
            return true;
        }

    }

    // Token 검증 (만료를 포함해 여러 부분을 검증)
    public static boolean validateToken(String token, String secretKey) throws AuthenticationException{
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    public static TokenDto createTokenDto(String loginId, String secretKey) {

        TokenDto tokenDto = TokenDto.builder()
                .AccessToken(createAccessToken(loginId, secretKey))
                .RefreshToken(createRefreshToken(loginId, secretKey))
                .build();

        return tokenDto;
    }

    public static String createAccessToken(String loginId, String secretKey){
        Claims claims = Jwts.claims(); //일종의 map같은 느낌 > 정보를 claims에 넣으면 된다.
        claims.put("loginId",loginId);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis())) //만든 날짜
                .setExpiration(new Date(System.currentTimeMillis()+ACCESS_TOKEN_EXPIRE_TIME)) // 끝난 날짜
                .signWith(SignatureAlgorithm.HS256, secretKey) // key 암호화
                .compact();
    }

    public static String createRefreshToken(String loginId, String secretKey) {
        Claims claims = Jwts.claims(); //일종의 map같은 느낌 > 정보를 claims에 넣으면 된다.
        claims.put("loginId",loginId);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis())) //만든 날짜
                .setExpiration(new Date(System.currentTimeMillis()+REFRESH_TOKEN_EXPIRE_TIME)) // 끝난 날짜
                .signWith(SignatureAlgorithm.HS256, secretKey) // key 암호화
                .compact();
    }

    public static String getToken(HttpServletRequest request){

        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        return authorization.split(" ")[1];
    }
}