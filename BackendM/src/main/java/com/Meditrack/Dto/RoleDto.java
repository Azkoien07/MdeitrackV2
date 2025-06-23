package com.Meditrack.Dto;

import com.Meditrack.Entity.RoleEntity;
import com.Meditrack.Entity.UserEntity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleDto {
    private Long id;

    @NotNull(message = "El tipo de rol es obligatorio")
    @Enumerated(EnumType.STRING)
    private RoleEntity.NameRol rol;

    // Relations
    private UserDto users;
}
