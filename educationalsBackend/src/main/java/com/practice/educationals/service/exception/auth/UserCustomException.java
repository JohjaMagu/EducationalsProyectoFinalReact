package com.practice.educationals.service.exception.auth;

import com.practice.educationals.service.exception.Exception;
import org.springframework.http.HttpStatus;

public class UserCustomException extends Exception {
  protected UserCustomException(HttpStatus status, String reason) {
    super(status, reason);
  }
}
