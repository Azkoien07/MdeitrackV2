package com.Meditrack.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;
import java.util.Date;

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
}
