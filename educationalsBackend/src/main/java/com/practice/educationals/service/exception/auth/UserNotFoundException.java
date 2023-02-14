package com.practice.educationals.service.exception.auth;

import com.practice.educationals.service.exception.Exception;
import org.springframework.http.HttpStatus;

public class UserNotFoundException extends Exception {
  public UserNotFoundException() {
    super(HttpStatus.NOT_FOUND, "Username not found.");
  }
}
