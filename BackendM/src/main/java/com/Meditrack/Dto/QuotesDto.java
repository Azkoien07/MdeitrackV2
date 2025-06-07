package com.Meditrack.Dto;

import com.Meditrack.Entity.QuotesEntity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuotesDto {
    private Long id;

    @NotNull(message = "La fecha es obligatoria")
    private Date date;

    @NotBlank(message = "La hora es obligatoria")
    private Date time;

    @NotBlank(message = "La sede es obligatoria")
    private String headquarters;

    @NotNull(message = "El estado de la cita es obligatorio")
    @Enumerated(EnumType.STRING)
    private QuotesEntity.State state;

    // Relations
}