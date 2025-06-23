package com.Meditrack.Business;

import com.Meditrack.Dto.PatientDto;
import com.Meditrack.Dto.RoleDto;
import com.Meditrack.Dto.UserDto;
import com.Meditrack.Entity.PatientEntity;
import com.Meditrack.Entity.RoleEntity;
import com.Meditrack.Service.PatientService;
import com.Meditrack.Utilities.Exception.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class PatientBusiness {
    private final PatientService patientService;
    private final ModelMapper modelMapper = new ModelMapper();

    public PatientBusiness(PatientService patientService) {
        this.patientService = patientService;

        // Evitar ciclos infinitos: ignora el paciente dentro del usuario
        this.modelMapper.typeMap(UserDto.class, UserDto.class)
                .addMappings(mapper -> mapper.skip(UserDto::setPatient));

        // Agrega soporte de mapeo para RoleEntity a RoleDto
        this.modelMapper.typeMap(com.Meditrack.Entity.RoleEntity.class, com.Meditrack.Dto.RoleDto.class);
    }


    // Validation Object

    // Find All
    public Page<PatientDto> findAll(int page, int size) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<PatientEntity> patientEntityPage = patientService.findAll(pageRequest);
            return patientEntityPage.map(entity -> modelMapper.map(entity, PatientDto.class));
        } catch (Exception e) {
            throw new CustomException("Error getting Patients: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Find ById
    public PatientDto findById(Long id) {
        try {
            PatientEntity patientEntity = patientService.getById(id);
            return modelMapper.map(patientEntity, PatientDto.class);
        } catch (Exception e) {
            throw new CustomException("Error getting Patient: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Add
    public PatientDto add(PatientDto patientDto) {
        try {
            PatientEntity patientEntity = modelMapper.map(patientDto, PatientEntity.class);
            return modelMapper.map(patientService.create(patientEntity), PatientDto.class);
        } catch (Exception e) {
            throw new CustomException("Error adding Patient: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update
    public void update(Long id, PatientDto patientDto) {
        try {
            patientDto.setId(id);
            PatientEntity patientEntity = modelMapper.map(patientDto, PatientEntity.class);
            patientService.update(patientEntity);
        } catch (Exception e) {
            throw new CustomException("Error updating Patient: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete
    public void delete(Long id) {
        try{
            patientService.delete(id);
        } catch (Exception e) {
            throw new CustomException("Error deleting Patient: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
