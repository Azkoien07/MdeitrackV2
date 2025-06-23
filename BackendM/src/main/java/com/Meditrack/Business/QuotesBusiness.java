package com.Meditrack.Business;

import com.Meditrack.Dto.DoctorDto;
import com.Meditrack.Dto.PatientDto;
import com.Meditrack.Dto.QuotesDto;
import com.Meditrack.Dto.SpecialtiesDto;
import com.Meditrack.Entity.QuotesEntity;
import com.Meditrack.Entity.RoleEntity;
import com.Meditrack.Service.QuotesService;
import com.Meditrack.Utilities.Exception.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class QuotesBusiness {
    private final QuotesService quotesService;
    private final ModelMapper modelMapper = new ModelMapper();

    public QuotesBusiness(QuotesService quotesService) {
        this.quotesService = quotesService;
    }

    // Validation Object

    // Find All
    public Page<QuotesDto> findAll(int page, int size) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<QuotesEntity> quotesEntityPage = quotesService.findAll(pageRequest);
            return quotesEntityPage.map(entity -> {
                QuotesDto dto = new QuotesDto();
                dto.setId(entity.getId());
                dto.setDate(entity.getDate());
                dto.setTime(entity.getTime());
                dto.setHeadquarters(entity.getHeadquarters());
                dto.setState(entity.getState());

                // Mapea relaciones si existen
                if (entity.getDoctor() != null) {
                    DoctorDto doctorDto = new DoctorDto();
                    doctorDto.setName(entity.getDoctor().getName());
                    doctorDto.setLastname(entity.getDoctor().getLastname());
                    // agrega más campos si los necesitas
                    dto.setDoctor(doctorDto);
                }

                if (entity.getSpecialties() != null) {
                    SpecialtiesDto specialtiesDto = new SpecialtiesDto();
                    specialtiesDto.setName(entity.getSpecialties().getName());
                    // agrega más campos si necesitas
                    dto.setSpecialties(specialtiesDto);
                }

                if (entity.getPatient() != null) {
                    PatientDto patientDto = new PatientDto();
                    patientDto.setName(entity.getPatient().getName());
                    dto.setPatient(patientDto);
                }

                return dto;
            });

        } catch (Exception e) {
            throw new CustomException("Error getting Quotes: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Find ById
    public QuotesDto findById(Long id) {
        try {
            QuotesEntity quotesEntity = quotesService.getById(id);
            return modelMapper.map(quotesEntity, QuotesDto.class);
        } catch (Exception e) {
            throw new CustomException("Error getting Quote: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Add
    public QuotesDto add(QuotesDto quotesDto) {
        try {
            QuotesEntity quotesEntity = modelMapper.map(quotesDto, QuotesEntity.class);
            return modelMapper.map(quotesService.create(quotesEntity), QuotesDto.class);
        } catch (Exception e) {
            throw new CustomException("Error adding Quote: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update
    public void update(Long id, QuotesDto quotesDto) {
        try {
            quotesDto.setId(id);
            QuotesEntity quotesEntity = modelMapper.map(quotesDto, QuotesEntity.class);
            quotesService.update(quotesEntity);
        } catch (Exception e) {
            throw new CustomException("Error updating Quote: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete
    public void delete(Long id) {
        try{
            quotesService.delete(id);
        } catch (Exception e) {
            throw new CustomException("Error deleting Quote: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
