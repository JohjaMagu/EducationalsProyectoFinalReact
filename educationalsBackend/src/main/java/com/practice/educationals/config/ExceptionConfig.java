package com.practice.educationals.config;

import com.practice.educationals.response.MessageStatusResponse;
import jakarta.validation.constraints.NotNull;
import lombok.val;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.support.WebExchangeBindException;
import org.springframework.web.server.ResponseStatusException;
import java.util.stream.Collectors;

@ControllerAdvice(annotations = RestController.class)
public class ExceptionConfig {

  @ExceptionHandler(WebExchangeBindException.class)
  public ResponseEntity<Object> validationException(@NotNull WebExchangeBindException e) {
    val errorMessage = e.getAllErrors()
      .stream()
      .map(DefaultMessageSourceResolvable::getDefaultMessage)
      .collect(Collectors.joining(", "));

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
      .body(MessageStatusResponse.builder().status(HttpStatus.BAD_REQUEST).body(errorMessage).build());
  }

  @ExceptionHandler(ResponseStatusException.class)
  public ResponseEntity<Object> controlledException(@NotNull ResponseStatusException e) {
    MessageStatusResponse body = MessageStatusResponse.builder()
      .status(HttpStatus.valueOf(e.getStatusCode().value()))
      .body(e.getReason())
      .build();
    return ResponseEntity.status(HttpStatus.valueOf(e.getStatusCode().value())).body(body);
  }
}
