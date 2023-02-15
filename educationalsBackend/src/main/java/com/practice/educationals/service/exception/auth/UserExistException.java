package com.practice.educationals.service.exception.auth;

import com.practice.educationals.service.exception.Exception;
import org.springframework.http.HttpStatus;

public class UserExistException extends Exception {
  public UserExistException() {
    super(HttpStatus.CONFLICT, "Username already in use.");
  }
}
