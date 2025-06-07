package com.Meditrack.Controller;

import com.Meditrack.Business.PatientBusiness;
import com.Meditrack.Dto.PatientDto;
import com.Meditrack.Utilities.Http.ResponseHttp;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/patient")
public class PatientController {
    private final PatientBusiness patientBusiness;

    public PatientController(PatientBusiness patientBusiness) {
        this.patientBusiness = patientBusiness;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllPatients(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<PatientDto> patientDtoPage = patientBusiness.findAll(page, size);
            Map<String, Object> response = ResponseHttp.responseHttpFindAll(
                    (Object) patientDtoPage.getContent(),
                    ResponseHttp.CODE_OK,
                    "Patients retrieved successfully",
                    patientDtoPage.getSize(),
                    patientDtoPage.getTotalPages(),
                    patientDtoPage.getTotalElements());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error retrieving Patients: " + e.getMessage(),
                            HttpStatus.INTERNAL_SERVER_ERROR),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Map<String, Object>> findByIdPatient(@PathVariable Long id) {
        try {
            PatientDto patientDto = patientBusiness.findById(id);
            Map<String, Object> response = ResponseHttp.responseHttpFindId(
                    patientDto,
                    ResponseHttp.CODE_OK,
                    "Patient retrieved successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error retrieving Patient: " + e.getMessage(),
                            HttpStatus.NOT_FOUND),
                    HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addPatient(@RequestBody PatientDto patientDto) {
        try {
            PatientDto savedPatient = patientBusiness.add(patientDto);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    savedPatient.getId(),
                    ResponseHttp.CODE_OK,
                    "Patient created successfully");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error creating Patient: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Map<String, Object>> updatePatient(@PathVariable Long id, @RequestBody PatientDto patientDto) {
        try {
            patientBusiness.update(id, patientDto);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Patient updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error updating Patient: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deletePatient(@PathVariable Long id) {
        try {
            patientBusiness.delete(id);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Patient deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error deleting Patient: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }
}