package com.Meditrack.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "patients")
public class PatientEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // Enums
    public enum Genres{
        Masculino,
        Femenino,
        Otro
    }
    public enum typeIdentification {
        CC,
        CE,
        TI,
        RC,
        PA,
        MS,
        NIT
    }
    // Columns
    @Column(name = "name")
    private String name;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "age")
    private int age;

    @Enumerated(EnumType.STRING)
    private Genres genres;

    @Column(name = "phone")
    private String phone;

    @Enumerated(EnumType.STRING)
    private typeIdentification typeIdentification;

    @Column(name = "identification", nullable = false, unique = true)
    private String identification;

    @Column(name = "eps")
    private String eps;

    @Column(name = "birthdate")
    private Date birthdate;

    // Relations
    // relation (1-1) con user
    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    @JsonManagedReference
    private UserEntity user;

    // relation (1-M) con quotes
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<QuotesEntity> quotes;
}
