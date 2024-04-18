package com.maker.Smart_To_Do_List.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class TokenDto {
    private String AccessToken;
    private String RefreshToken;
}
