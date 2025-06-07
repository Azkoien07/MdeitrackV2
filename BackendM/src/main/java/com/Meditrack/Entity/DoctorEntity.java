package com.Meditrack.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "doctors")
public class DoctorEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Enums
    public enum Genres{
        Masculino,
        Femenino,
        Otro
    }

    public enum Turns{
        Mañana,
        Tarde,
        Noche
    }
    // Columns
    @Column(name = "name")
    private String name;

    @Column(name = "lastname")
    private String lastname;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Genres genres;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Turns turns;

    // Relations

}