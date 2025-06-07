package com.Meditrack.Service;

import com.Meditrack.Entity.QuotesEntity;
import com.Meditrack.Repository.QuotesRepository;
import com.Meditrack.Service.Dao.Idao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class QuotesService implements Idao<QuotesEntity, Long> {

    private final QuotesRepository quotesRepository;

    public QuotesService(QuotesRepository quotesRepository) {
        this.quotesRepository = quotesRepository;
    }

    // Methods

    // FindAll
    @Override
    public Page<QuotesEntity> findAll(PageRequest pageable) {
        return quotesRepository.findAll(pageable);
    }

    // FindAll (without pagination)
    @Override
    public List<QuotesEntity> getAll() {
        return quotesRepository.findAll();
    }

    // GetById
    @Override
    public QuotesEntity getById(Long id) {
        Optional<QuotesEntity> quotes = quotesRepository.findById(id);
        return quotes.orElse(null);
    }

    // Create
    @Transactional
    @Override
    public QuotesEntity create(QuotesEntity entity) {
        if (entity.getId() != null && quotesRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("El Quotes con ID " + entity.getId() + " ya existe.");
        }
        return quotesRepository.save(entity);
    }

    // Update
    @Transactional
    @Override
    public QuotesEntity update(QuotesEntity entity) {
        if (entity.getId() == null || !quotesRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("No se puede actualizar un Quotes que no existe o sin ID.");
        }
        return quotesRepository.save(entity);
    }

    // Delete
    @Transactional
    @Override
    public void delete(Long id) {
        quotesRepository.deleteById(id);
    }
}
