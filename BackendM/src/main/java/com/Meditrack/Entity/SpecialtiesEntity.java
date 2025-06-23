package com.Meditrack.Entity;

import jakarta.persistence.*;
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
@Table(name = "specialties")
public class SpecialtiesEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Columns
    @Column(name = "specialty_code")
    private String specialtyCode;

    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    // Relations
    // relation (1-M) con quotes
    @OneToMany(mappedBy = "specialties")
    private Set<QuotesEntity> quotes;

    // relation (M-M) con doctor
    @ManyToMany(mappedBy = "specialties")
    private Set<DoctorEntity> doctors;
}
