package com.Meditrack.Controller;

import com.Meditrack.Business.UserBusiness;
import com.Meditrack.Dto.UserDto;
import com.Meditrack.Utilities.Http.ResponseHttp;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserBusiness userBusiness;

    public UserController(UserBusiness userBusiness) {
        this.userBusiness = userBusiness;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<UserDto> userDtoPage = userBusiness.findAll(page, size);
            Map<String, Object> response = ResponseHttp.responseHttpFindAll(
                    (Object) userDtoPage.getContent(),
                    ResponseHttp.CODE_OK,
                    "Users retrieved successfully",
                    userDtoPage.getSize(),
                    userDtoPage.getTotalPages(),
                    userDtoPage.getTotalElements());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error retrieving Users: " + e.getMessage(),
                            HttpStatus.INTERNAL_SERVER_ERROR),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Map<String, Object>> findByIdUser(@PathVariable Long id) {
        try {
            UserDto userDto = userBusiness.findById(id);
            Map<String, Object> response = ResponseHttp.responseHttpFindId(
                    userDto,
                    ResponseHttp.CODE_OK,
                    "User retrieved successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error retrieving User: " + e.getMessage(),
                            HttpStatus.NOT_FOUND),
                    HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addUser(@RequestBody UserDto userDto) {
        try {
            UserDto savedUser = userBusiness.add(userDto);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    savedUser.getId(),
                    ResponseHttp.CODE_OK,
                    "Users created successfully");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error creating Users: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Map<String, Object>> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        try {
            userBusiness.update(id, userDto);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "User updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error updating User: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long id) {
        try {
            userBusiness.delete(id);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "User deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error deleting User: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
