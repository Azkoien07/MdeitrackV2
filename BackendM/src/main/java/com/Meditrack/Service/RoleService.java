package com.Meditrack.Service;

import com.Meditrack.Entity.RoleEntity;
import com.Meditrack.Repository.RoleRepository;
import com.Meditrack.Service.Dao.Idao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class RoleService implements Idao<RoleEntity, Long> {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    // Methods

    // FindAll
    @Override
    public Page<RoleEntity> findAll(PageRequest pageable) {
        return roleRepository.findAll(pageable);
    }

    // FindAll (without pagination)
    @Override
    public List<RoleEntity> getAll() {
        return roleRepository.findAll();
    }

    // GetById
    @Override
    public RoleEntity getById(Long id) {
        Optional<RoleEntity> role = roleRepository.findById(id);
        return role.orElse(null);
    }

    // Create
    @Transactional
    @Override
    public RoleEntity create(RoleEntity entity) {
        if (entity.getId() != null && roleRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("El Role con ID " + entity.getId() + " ya existe.");
        }
        return roleRepository.save(entity);
    }

    // Update
    @Transactional
    @Override
    public RoleEntity update(RoleEntity entity) {
        if (entity.getId() == null || !roleRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("No se puede actualizar un Role que no existe o sin ID.");
        }
        return roleRepository.save(entity);
    }

    // Delete
    @Transactional
    @Override
    public void delete(Long id) {
        roleRepository.deleteById(id);
    }
}
