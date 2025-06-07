package com.Meditrack.Business;

import com.Meditrack.Dto.QuotesDto;
import com.Meditrack.Entity.QuotesEntity;
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
            return quotesEntityPage.map(entity -> modelMapper.map(entity, QuotesDto.class));
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
