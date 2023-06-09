package com.maker.Smart_To_Do_List.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpHeaders;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

public class JwtUtil {

    public static String getLoginId(String token, String secretKey){
        return Jwts.parser().setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody().get("loginId",String.class);
    }


    public static boolean isExpired(String token, String secretKey){
        return Jwts.parser().setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody().getExpiration().before(new Date());
    }
    public static String createToken(String loginId, String key, long expireTimeMs){
        Claims claims = Jwts.claims(); //일종의 map같은 느낌 > 정보를 claims에 넣으면 된다.
        claims.put("loginId",loginId);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis())) //만든 날짜
                .setExpiration(new Date(System.currentTimeMillis()+expireTimeMs)) // 끝난 날짜
                .signWith(SignatureAlgorithm.HS256,key) // key 암호화
                .compact();
    }

    public static String getToken(HttpServletRequest request){

        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        return authorization.split(" ")[1];
    }
}