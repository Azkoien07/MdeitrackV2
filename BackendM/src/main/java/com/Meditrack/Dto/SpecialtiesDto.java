package com.Meditrack.Dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecialtiesDto {
    private Long id;

    @NotBlank(message = "El código de especialidad es obligatorio")
    private String specialtyCode;

    @NotBlank(message = "El nombre de la especialidad es obligatorio")
    private String name;

    @NotBlank(message = "La descripción es obligatoria")
    private String description;

    // Relations
}
