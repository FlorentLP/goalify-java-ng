package com.goalify.auth.dto;

import com.goalify.user.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponseDto {

    private Long userId;
    private String email;
    private String name;
    private String token;
    public AuthResponseDto(User user, String token) {
        this.userId = user.getId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.token = token;
    }
}
