package com.Meditrack.Dto;

import com.Meditrack.Entity.RoleEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {
    private String token;
    private String rol;

    public LoginResponseDto(String token, RoleEntity.NameRol rol) {
        this.token = token;
        this.rol = rol.name();
    }

}