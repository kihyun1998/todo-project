package com.maker.Smart_To_Do_List.configuration;
import com.maker.Smart_To_Do_List.utils.JwtUtil;
import com.maker.Smart_To_Do_List.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    private final String secretKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("authorization:{}",authorization);

        // token 못 받거나 authorization 키 시작이 "Bearer " 가 아니면 error
        if(authorization == null || !authorization.startsWith("Bearer ")){
            log.error("INVALID AUTHORIZATION");
            filterChain.doFilter(request,response);
            return ;
        }

        // get Token
        String token = authorization.split(" ")[1];

        // Token 만류 여부 확인
        if(JwtUtil.isExpired(token,secretKey)){
            log.error("Token has expired !!");
            filterChain.doFilter(request,response);
            return ;
        }

        // Token에서 loginId 가져오기
        String loginId = JwtUtil.getLoginId(token,secretKey);
        log.info("loginId:{}",loginId);


        // grant
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginId, null, List.of(new SimpleGrantedAuthority("USER")));

        // detail 넣기
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        filterChain.doFilter(request,response);
    }
}