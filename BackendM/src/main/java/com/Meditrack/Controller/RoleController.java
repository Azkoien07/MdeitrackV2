package com.Meditrack.Controller;

import com.Meditrack.Business.RoleBusiness;
import com.Meditrack.Dto.RoleDto;
import com.Meditrack.Utilities.Http.ResponseHttp;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/role")
public class RoleController {
    private final RoleBusiness roleBusiness;

    public RoleController(RoleBusiness roleBusiness) {
        this.roleBusiness = roleBusiness;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllRoles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<RoleDto> roleDtoPage = roleBusiness.findAll(page, size);
            Map<String, Object> response = ResponseHttp.responseHttpFindAll(
                    (Object) roleDtoPage.getContent(),
                    ResponseHttp.CODE_OK,
                    "Roles retrieved successfully",
                    roleDtoPage.getSize(),
                    roleDtoPage.getTotalPages(),
                    roleDtoPage.getTotalElements());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error retrieving Roles: " + e.getMessage(),
                            HttpStatus.INTERNAL_SERVER_ERROR),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Map<String, Object>> findByIdRole(@PathVariable Long id) {
        try {
            RoleDto roleDto = roleBusiness.findById(id);
            Map<String, Object> response = ResponseHttp.responseHttpFindId(
                    roleDto,
                    ResponseHttp.CODE_OK,
                    "Role retrieved successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error retrieving Role: " + e.getMessage(),
                            HttpStatus.NOT_FOUND),
                    HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addRole(@RequestBody RoleDto roleDto) {
        try {
            RoleDto savedRole = roleBusiness.add(roleDto);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    savedRole.getId(),
                    ResponseHttp.CODE_OK,
                    "Role created successfully");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error creating Role: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Map<String, Object>> updateRole(@PathVariable Long id, @RequestBody RoleDto roleDto) {
        try {
            roleBusiness.update(id, roleDto);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Role updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error updating Role: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteRole(@PathVariable Long id) {
        try {
            roleBusiness.delete(id);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Role deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error deleting Role: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }
}