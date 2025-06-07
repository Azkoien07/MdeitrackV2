package com.Meditrack.Repository;

import com.Meditrack.Entity.QuotesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuotesRepository extends JpaRepository<QuotesEntity, Long> {
}