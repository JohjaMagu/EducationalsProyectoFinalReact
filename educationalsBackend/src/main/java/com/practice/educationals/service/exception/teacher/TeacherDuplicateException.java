package com.practice.educationals.service.exception.teacher;

import com.practice.educationals.service.exception.Exception;
import org.springframework.http.HttpStatus;

public class TeacherDuplicateException extends Exception {
  public TeacherDuplicateException(Integer identification) {
    super(HttpStatus.CONFLICT, "Teacher with identification <" + identification + "> already exist.");
  }
}
