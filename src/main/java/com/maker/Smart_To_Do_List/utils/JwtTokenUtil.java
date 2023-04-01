package com.maker.Smart_To_Do_List.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtTokenUtil {
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
}
