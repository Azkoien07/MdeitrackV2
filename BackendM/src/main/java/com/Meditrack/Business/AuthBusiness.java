package com.Meditrack.Business;

import com.Meditrack.Dto.LoginResponseDto;
import com.Meditrack.Entity.UserEntity;
import com.Meditrack.Service.AuthService;
import com.Meditrack.Utilities.JwtUtil;
import org.springframework.stereotype.Component;

@Component
public class AuthBusiness {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthBusiness(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponseDto login(String email, String password) {
        UserEntity user = authService.validateCredentials(email, password);

        if (user == null) {
            throw new RuntimeException("Credenciales inválidas");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new LoginResponseDto(token, user.getRole().getRol());
    }
}
