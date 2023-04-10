package com.maker.Smart_To_Do_List.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.maker.Smart_To_Do_List.dto.GlobalResDto;
import com.maker.Smart_To_Do_List.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    // HTTP 요청이 오면 WAS(tomcat)가 HttpServletRequest, HttpServletResponse 객체를 만들어 줍니다.
    // 만든 인자 값을 받아옵니다.
    // 요청이 들어오면 diFilterInternal 이 딱 한번 실행된다.
    // WebSecurityConfig 에서 보았던 UsernamePasswordAuthenticationFilter 보다 먼저 동작을 하게 됩니다.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = jwtUtil.getHeaderToken(request,"Access");
        String refreshToken = jwtUtil.getHeaderToken(request,"Refresh");
        
        // 액세스 토큰이 유효하다면
        if (accessToken != null){
            if (jwtUtil.tokenValidation(accessToken)){
                setAuthentication(jwtUtil.getLoginIdFromToken(accessToken));
            }
            // 액세스 토큰이 만료 시
            else if (refreshToken != null){
                // 리프레시 토큰 검증
                boolean isRefreshToken = jwtUtil.refreshTokenValidation(refreshToken);
                if (isRefreshToken){
                    String loginId = jwtUtil.getLoginIdFromToken(refreshToken);
                    String newAccessToken = jwtUtil.createToken(loginId,"Access");
                    
                    // 액세스 토큰 생성
                    jwtUtil.setHeaderAccessToken(response,newAccessToken);
                    setAuthentication(jwtUtil.getLoginIdFromToken(newAccessToken));
                }
                else {
                    jwtExceptionHandler(response, "RefreshToken is Expired",HttpStatus.BAD_REQUEST);
                    return;
                }
            }
        }
        filterChain.doFilter(request,response);
    }

    // SecurityContext에 Authentication 객체 저장
    public void setAuthentication(String email){
        Authentication authentication = jwtUtil.createAuthentication(email);
        // security가 만들어주는 securityContextHolder 안에 authentication넣어줌
        // security가 securityContextHolder에서 인증 객체 확인
        // jwtAuthfilter에서 authentication을 넣어주면 UsernamePasswordAuthenticationFilter 내부에서
        // 인증이 된 것을 확인하고 추가적인 작업을 진행안함.

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    public void jwtExceptionHandler(HttpServletResponse response, String msg, HttpStatus status){
        response.setStatus(status.value());
        response.setContentType("application/json");
        try{
            String json = new ObjectMapper().writeValueAsString(new GlobalResDto(msg,status.value()));
        }catch (Exception e){
            log.error(e.getMessage());
        }
    }
}
