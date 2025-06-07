package com.Meditrack.Service;

import com.Meditrack.Entity.SpecialtiesEntity;
import com.Meditrack.Repository.SpecialtiesRepository;
import com.Meditrack.Service.Dao.Idao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SpecialitiesService implements Idao<SpecialtiesEntity, Long> {

    private final SpecialtiesRepository specialtiesRepository;

    public SpecialitiesService(SpecialtiesRepository specialtiesRepository) {
        this.specialtiesRepository = specialtiesRepository;
    }

    // Methods

    // FindAll
    @Override
    public Page<SpecialtiesEntity> findAll(PageRequest pageable) {
        return specialtiesRepository.findAll(pageable);
    }

    // FindAll (without pagination)
    @Override
    public List<SpecialtiesEntity> getAll() {
        return specialtiesRepository.findAll();
    }

    // GetById
    @Override
    public SpecialtiesEntity getById(Long id) {
        Optional<SpecialtiesEntity> specialties = specialtiesRepository.findById(id);
        return specialties.orElse(null);
    }

    // Create
    @Transactional
    @Override
    public SpecialtiesEntity create(SpecialtiesEntity entity) {
        if (entity.getId() != null && specialtiesRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("El Specialties con ID " + entity.getId() + " ya existe.");
        }
        return specialtiesRepository.save(entity);
    }

    // Update
    @Transactional
    @Override
    public SpecialtiesEntity update(SpecialtiesEntity entity) {
        if (entity.getId() == null || !specialtiesRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("No se puede actualizar un Specialties que no existe o sin ID.");
        }
        return specialtiesRepository.save(entity);
    }

    // Delete
    @Transactional
    @Override
    public void delete(Long id) {
        specialtiesRepository.deleteById(id);
    }
}
