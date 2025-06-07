package com.Meditrack.Repository;

import com.Meditrack.Entity.SpecialtiesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialtiesRepository extends JpaRepository<SpecialtiesEntity, Long> {
}