package com.practice.educationals.service.exception.teacher;

import com.practice.educationals.service.exception.Exception;
import org.springframework.http.HttpStatus;

public class TeacherInactiveException extends Exception {
  public TeacherInactiveException(Integer identification) {
    super(HttpStatus.CONFLICT, "Teacher with identification <" + identification + "> is not active.");
  }
}
