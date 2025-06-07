package com.Meditrack.Service;

import com.Meditrack.Entity.DoctorEntity;
import com.Meditrack.Repository.DoctorRepository;
import com.Meditrack.Service.Dao.Idao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorService implements Idao<DoctorEntity, Long> {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    // Methods

    // FindAll
    @Override
    public Page<DoctorEntity> findAll(PageRequest pageable) {
        return doctorRepository.findAll(pageable);
    }

    // FindAll (without pagination)
    @Override
    public List<DoctorEntity> getAll() {
        return doctorRepository.findAll();
    }

    // GetById
    @Override
    public DoctorEntity getById(Long id) {
        Optional<DoctorEntity> doctor = doctorRepository.findById(id);
        return doctor.orElse(null);
    }

    // Create
    @Transactional
    @Override
    public DoctorEntity create(DoctorEntity entity) {
        if (entity.getId() != null && doctorRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("El doctor con ID " + entity.getId() + " ya existe.");
        }
        return doctorRepository.save(entity);
    }

    // Update
    @Transactional
    @Override
    public DoctorEntity update(DoctorEntity entity) {
        if (entity.getId() == null || !doctorRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("No se puede actualizar un Doctor que no existe o sin ID.");
        }
        return doctorRepository.save(entity);
    }

    // Delete
    @Transactional
    @Override
    public void delete(Long id) {
        doctorRepository.deleteById(id);
    }
}