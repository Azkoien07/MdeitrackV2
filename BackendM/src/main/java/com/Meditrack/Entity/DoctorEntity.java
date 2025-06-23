package com.Meditrack.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;
import java.util.Set;

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
    // relation (1-1) con user
    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private UserEntity user;

    // relation (1-M) con quotes
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private Set<QuotesEntity> quotes;

    // relation (M-M) con specialties
    @ManyToMany
    @JoinTable(
            name = "doctor_specialty",
            joinColumns = @JoinColumn(name = "doctor_id"),
            inverseJoinColumns = @JoinColumn(name = "specialty_id")
    )
    private Set<SpecialtiesEntity> specialties;
}