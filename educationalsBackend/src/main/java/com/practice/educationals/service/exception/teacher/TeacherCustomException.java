package com.practice.educationals.service.exception.teacher;

import com.practice.educationals.service.exception.Exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public class TeacherCustomException extends Exception {
  public TeacherCustomException(HttpStatusCode statusCode, String reason) {
    super(HttpStatus.valueOf(statusCode.value()), reason);
  }
}
