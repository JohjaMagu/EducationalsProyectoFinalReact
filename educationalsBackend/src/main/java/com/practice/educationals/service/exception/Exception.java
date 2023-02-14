package com.practice.educationals.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public abstract class Exception extends ResponseStatusException {

  protected Exception(HttpStatus status, String reason) {
    super(status, reason);
  }
}
