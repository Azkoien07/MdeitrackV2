package com.Meditrack.Repository;

import com.Meditrack.Entity.QuotesEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuotesRepository extends JpaRepository<QuotesEntity, Long> {
    @EntityGraph(attributePaths = {"doctor", "patient", "specialties"})
    Page<QuotesEntity> findAll(Pageable pageable);

}