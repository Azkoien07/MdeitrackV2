package com.Meditrack.Service;

import com.Meditrack.Entity.PatientEntity;
import com.Meditrack.Repository.PatientRepository;
import com.Meditrack.Service.Dao.Idao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService implements Idao<PatientEntity, Long> {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    // Methods

    // FindAll
    @Override
    public Page<PatientEntity> findAll(PageRequest pageable) {
        return patientRepository.findAll(pageable);
    }

    // FindAll (without pagination)
    @Override
    public List<PatientEntity> getAll() {
        return patientRepository.findAll();
    }

    // GetById
    @Override
    public PatientEntity getById(Long id) {
        Optional<PatientEntity> patient = patientRepository.findById(id);
        return patient.orElse(null);
    }

    // Create
    @Transactional
    @Override
    public PatientEntity create(PatientEntity entity) {
        if (entity.getId() != null && patientRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("El Patient con ID " + entity.getId() + " ya existe.");
        }
        return patientRepository.save(entity);
    }

    // Update
    @Transactional
    @Override
    public PatientEntity update(PatientEntity entity) {
        if (entity.getId() == null || !patientRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("No se puede actualizar un Patient que no existe o sin ID.");
        }
        return patientRepository.save(entity);
    }

    // Delete
    @Transactional
    @Override
    public void delete(Long id) {
        patientRepository.deleteById(id);
    }
}
