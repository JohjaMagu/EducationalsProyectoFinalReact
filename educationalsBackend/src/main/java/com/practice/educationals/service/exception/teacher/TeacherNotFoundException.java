package com.practice.educationals.service.exception.teacher;

import com.practice.educationals.service.exception.Exception;
import org.springframework.http.HttpStatus;

public class TeacherNotFoundException extends Exception {
  public TeacherNotFoundException(Integer identification) {
    super(HttpStatus.NOT_FOUND, "Teacher with identification <" + identification + "> not found.");
  }
}
