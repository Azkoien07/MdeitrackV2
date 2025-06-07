package com.Meditrack.Business;

import com.Meditrack.Dto.SpecialtiesDto;
import com.Meditrack.Entity.SpecialtiesEntity;
import com.Meditrack.Service.SpecialitiesService;
import com.Meditrack.Utilities.Exception.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class SpecialtiesBusiness {
    private final SpecialitiesService specialitiesService;
    private final ModelMapper modelMapper = new ModelMapper();

    public SpecialtiesBusiness(SpecialitiesService specialitiesService) {
        this.specialitiesService = specialitiesService;
    }

    // Validation Object

    // Find All
    public Page<SpecialtiesDto> findAll(int page, int size) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<SpecialtiesEntity> specialitiesEntityPage = specialitiesService.findAll(pageRequest);
            return specialitiesEntityPage.map(entity -> modelMapper.map(entity, SpecialtiesDto.class));
        } catch (Exception e) {
            throw new CustomException("Error getting Specialities: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Find ById
    public SpecialtiesDto findById(Long id) {
        try {
            SpecialtiesEntity challengeEntity = specialitiesService.getById(id);
            return modelMapper.map(challengeEntity, SpecialtiesDto.class);
        } catch (Exception e) {
            throw new CustomException("Error getting Specialties: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Add
    public SpecialtiesDto add(SpecialtiesDto specialitiesDto) {
        try {
            SpecialtiesEntity challengeEntity = modelMapper.map(specialitiesDto, SpecialtiesEntity.class);
            return modelMapper.map(specialitiesService.create(challengeEntity), SpecialtiesDto.class);
        } catch (Exception e) {
            throw new CustomException("Error adding Specialties: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update
    public void update(Long id, SpecialtiesDto specialitiesDto) {
        try {
            specialitiesDto.setId(id);
            SpecialtiesEntity challengeEntity = modelMapper.map(specialitiesDto, SpecialtiesEntity.class);
            specialitiesService.update(challengeEntity);
        } catch (Exception e) {
            throw new CustomException("Error updating Specialties: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete
    public void delete(Long id) {
        try{
            specialitiesService.delete(id);
        } catch (Exception e) {
            throw new CustomException("Error deleting Specialties: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
