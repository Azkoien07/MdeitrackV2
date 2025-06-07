package com.Meditrack.Dto;

import com.Meditrack.Entity.DoctorEntity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDto {
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @NotBlank(message = "El apellido es obligatorio")
    private String lastname;

    @NotNull(message = "El género es obligatorio")
    @Enumerated(EnumType.STRING)
    private DoctorEntity.Genres genres;

    @NotNull(message = "El turno de trabajo es obligatorio")
    @Enumerated(EnumType.STRING)
    private DoctorEntity.Turns turns;

    // Relations
}
