package com.Meditrack.Controller;

import com.Meditrack.Business.DoctorBusiness;
import com.Meditrack.Dto.DoctorDto;
import com.Meditrack.Utilities.Http.ResponseHttp;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/doctor")
public class DoctorController {
    private final DoctorBusiness doctorBusiness;

    public DoctorController(DoctorBusiness doctorBusiness) {
        this.doctorBusiness = doctorBusiness;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllDoctors(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<DoctorDto> doctorDtoPage = doctorBusiness.findAll(page, size);
            Map<String, Object> response = ResponseHttp.responseHttpFindAll(
                    (Object) doctorDtoPage.getContent(),
                    ResponseHttp.CODE_OK,
                    "Doctors retrieved successfully",
                    doctorDtoPage.getSize(),
                    doctorDtoPage.getTotalPages(),
                    doctorDtoPage.getTotalElements());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error retrieving Doctors: " + e.getMessage(),
                            HttpStatus.INTERNAL_SERVER_ERROR),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Map<String, Object>> findByIdDoctor(@PathVariable Long id) {
        try {
            DoctorDto doctorDto = doctorBusiness.findById(id);
            Map<String, Object> response = ResponseHttp.responseHttpFindId(
                    doctorDto,
                    ResponseHttp.CODE_OK,
                    "Doctor retrieved successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error retrieving Doctor: " + e.getMessage(),
                            HttpStatus.NOT_FOUND),
                    HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addDoctor(@RequestBody DoctorDto doctorDto) {
        try {
            DoctorDto savedDoctor = doctorBusiness.add(doctorDto);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    savedDoctor.getId(),
                    ResponseHttp.CODE_OK,
                    "Doctor created successfully");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error creating Doctor: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Map<String, Object>> updateDoctor(@PathVariable Long id, @RequestBody DoctorDto doctorDto) {
        try {
            doctorBusiness.update(id, doctorDto);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Doctor updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error updating Doctor: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteDoctor(@PathVariable Long id) {
        try {
            doctorBusiness.delete(id);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Doctor deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error deleting Doctor: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }
}