package com.Meditrack.Service;

import com.Meditrack.Entity.UserEntity;
import com.Meditrack.Repository.UserRepository;
import com.Meditrack.Service.Dao.Idao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements Idao<UserEntity, Long> {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Methods

    // FindAll
    @Override
    public Page<UserEntity> findAll(PageRequest pageable) {
        return userRepository.findAll(pageable);
    }

    // FindAll (without pagination)
    @Override
    public List<UserEntity> getAll() {
        return userRepository.findAll();
    }

    // GetById
    @Override
    public UserEntity getById(Long id) {
        Optional<UserEntity> user = userRepository.findById(id);
        return user.orElse(null);
    }

    // Create
    @Transactional
    @Override
    public UserEntity create(UserEntity entity) {
        if (entity.getId() != null && userRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("El User con ID " + entity.getId() + " ya existe.");
        }
        return userRepository.save(entity);
    }

    // Update
    @Transactional
    @Override
    public UserEntity update(UserEntity entity) {
        if (entity.getId() == null || !userRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("No se puede actualizar un User que no existe o sin ID.");
        }
        return userRepository.save(entity);
    }

    // Delete
    @Transactional
    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
