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
@Table(name = "quotes")
public class QuotesEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public enum State{
        Pendiente,
        Cancelada,
        Relizada
    }
    // Columns
    @Column(name = "date")
    private Date date;

    @Column(name = "time")
    private Date time;

    @Column(name = "headquarters")
    private String headquarters;

    @Enumerated(EnumType.STRING)
    private State state;

    // Relations
}