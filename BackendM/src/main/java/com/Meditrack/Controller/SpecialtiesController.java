package com.Meditrack.Controller;

import com.Meditrack.Business.SpecialtiesBusiness;
import com.Meditrack.Dto.SpecialtiesDto;
import com.Meditrack.Utilities.Http.ResponseHttp;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/specialties")
public class SpecialtiesController {
    private final SpecialtiesBusiness specialtiesBusiness;

    public SpecialtiesController(SpecialtiesBusiness specialtiesBusiness) {
        this.specialtiesBusiness = specialtiesBusiness;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllSpecialties(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<SpecialtiesDto> specialtiesDtoPage = specialtiesBusiness.findAll(page, size);
            Map<String, Object> response = ResponseHttp.responseHttpFindAll(
                    (Object) specialtiesDtoPage.getContent(),
                    ResponseHttp.CODE_OK,
                    "Specialties retrieved successfully",
                    specialtiesDtoPage.getSize(),
                    specialtiesDtoPage.getTotalPages(),
                    specialtiesDtoPage.getTotalElements());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error retrieving Specialties: " + e.getMessage(),
                            HttpStatus.INTERNAL_SERVER_ERROR),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Map<String, Object>> findByIdSpecialty(@PathVariable Long id) {
        try {
            SpecialtiesDto specialtiesDto = specialtiesBusiness.findById(id);
            Map<String, Object> response = ResponseHttp.responseHttpFindId(
                    specialtiesDto,
                    ResponseHttp.CODE_OK,
                    "Specialty retrieved successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error retrieving Specialty: " + e.getMessage(),
                            HttpStatus.NOT_FOUND),
                    HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addSpecialty(@RequestBody SpecialtiesDto specialtiesDto) {
        try {
            SpecialtiesDto savedSpecialty = specialtiesBusiness.add(specialtiesDto);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    savedSpecialty.getId(),
                    ResponseHttp.CODE_OK,
                    "Specialty created successfully");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error creating Specialty: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Map<String, Object>> updateSpecialty(@PathVariable Long id, @RequestBody SpecialtiesDto specialtiesDto) {
        try {
            specialtiesBusiness.update(id, specialtiesDto);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Specialty updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error updating Specialty: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteSpecialty(@PathVariable Long id) {
        try {
            specialtiesBusiness.delete(id);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Specialty deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error deleting Specialty: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
