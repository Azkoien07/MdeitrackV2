package com.Meditrack.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "roles")
public class RoleEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Enums
    public enum NameRol{
        Admin,
        Paciente,
        Doctor
    }

    // Columns
    @Enumerated(EnumType.STRING)
    private NameRol rol;

    // Relations
    // relation (1-M) con User
    @OneToMany(mappedBy = "role")
    private List<UserEntity> users;
}
