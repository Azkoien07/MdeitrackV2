package com.Meditrack.Controller;

import com.Meditrack.Business.QuotesBusiness;
import com.Meditrack.Dto.QuotesDto;
import com.Meditrack.Utilities.Http.ResponseHttp;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/quotes")
public class QuotesController {
    private final QuotesBusiness quotesBusiness;

    public QuotesController(QuotesBusiness quotesBusiness) {
        this.quotesBusiness = quotesBusiness;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllQuotes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<QuotesDto> quotesDtoPage = quotesBusiness.findAll(page, size);
            Map<String, Object> response = ResponseHttp.responseHttpFindAll(
                    (Object) quotesDtoPage.getContent(),
                    ResponseHttp.CODE_OK,
                    "Quotes retrieved successfully",
                    quotesDtoPage.getSize(),
                    quotesDtoPage.getTotalPages(),
                    quotesDtoPage.getTotalElements());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error retrieving Quotes: " + e.getMessage(),
                            HttpStatus.INTERNAL_SERVER_ERROR),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Map<String, Object>> findByIdQuote(@PathVariable Long id) {
        try {
            QuotesDto quotesDto = quotesBusiness.findById(id);
            Map<String, Object> response = ResponseHttp.responseHttpFindId(
                    quotesDto,
                    ResponseHttp.CODE_OK,
                    "Quote retrieved successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error retrieving Quote: " + e.getMessage(),
                            HttpStatus.NOT_FOUND),
                    HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addQuote(@RequestBody QuotesDto quotesDto) {
        try {
            QuotesDto savedQuote = quotesBusiness.add(quotesDto);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    savedQuote.getId(),
                    ResponseHttp.CODE_OK,
                    "Quote created successfully");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error creating Quote: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Map<String, Object>> updateQuote(@PathVariable Long id, @RequestBody QuotesDto quotesDto) {
        try {
            quotesBusiness.update(id, quotesDto);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Quote updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error updating Quote: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteQuote(@PathVariable Long id) {
        try {
            quotesBusiness.delete(id);
            Map<String, Object> response = ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Quote deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    ResponseHttp.responseHttpError("Error deleting Quote: " + e.getMessage(),
                            HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }
    }
}