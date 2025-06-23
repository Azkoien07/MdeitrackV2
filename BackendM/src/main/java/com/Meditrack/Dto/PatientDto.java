package com.Meditrack.Dto;

import com.Meditrack.Entity.PatientEntity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDto {
    private Long id;

    @NotNull(message = "El nombre es obligatorio")
    private String name;

    @NotNull(message = "El apellido es obligatorio")
    private String lastname;

    @NotNull(message = "")
    private int age;

    @NotNull(message = "El género es obligatorio")
    @Enumerated(EnumType.STRING)
    private PatientEntity.Genres genres;

    @NotBlank(message = "El teléfono es obligatorio")
    private String phone;

    @NotNull(message = "El tipo de identificación es obligatorio")
    @Enumerated(EnumType.STRING)
    private PatientEntity.typeIdentification typeIdentification;

    @NotBlank(message = "El número de identificación es obligatorio")
    private String identification;

    @NotBlank(message = "La EPS es obligatoria")
    private String eps;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    private Date birthdate;

    // Relations
    private UserLiteDto user;
    private QuotesDto quotes;
}