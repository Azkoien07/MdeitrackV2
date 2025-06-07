package com.Meditrack.Business;

import com.Meditrack.Dto.DoctorDto;
import com.Meditrack.Entity.DoctorEntity;
import com.Meditrack.Service.DoctorService;
import com.Meditrack.Utilities.Exception.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class DoctorBusiness {
    private final DoctorService doctorService;
    private final ModelMapper modelMapper = new ModelMapper();

    public DoctorBusiness(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    // Validation Object

    // Find All
    public Page<DoctorDto> findAll(int page, int size) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<DoctorEntity> doctorEntityPage = doctorService.findAll(pageRequest);
            return doctorEntityPage.map(entity -> modelMapper.map(entity, DoctorDto.class));
        } catch (Exception e) {
            throw new CustomException("Error getting Doctors: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Find ById
    public DoctorDto findById(Long id) {
        try {
            DoctorEntity doctorEntity = doctorService.getById(id);
            return modelMapper.map(doctorEntity, DoctorDto.class);
        } catch (Exception e) {
            throw new CustomException("Error getting Doctor: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Add
    public DoctorDto add(DoctorDto doctorDto) {
        try {
            DoctorEntity doctorEntity = modelMapper.map(doctorDto, DoctorEntity.class);
            return modelMapper.map(doctorService.create(doctorEntity), DoctorDto.class);
        } catch (Exception e) {
            throw new CustomException("Error adding Doctor: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update
    public void update(Long id, DoctorDto doctorDto) {
        try {
            doctorDto.setId(id);
            DoctorEntity doctorEntity = modelMapper.map(doctorDto, DoctorEntity.class);
            doctorService.update(doctorEntity);
        } catch (Exception e) {
            throw new CustomException("Error updating Doctor: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete
    public void delete(Long id) {
        try{
            doctorService.delete(id);
        } catch (Exception e) {
            throw new CustomException("Error deleting Doctor: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}