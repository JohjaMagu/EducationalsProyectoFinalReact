package com.practice.educationals.service.exception.course;

import com.practice.educationals.service.exception.Exception;
import org.springframework.http.HttpStatus;

public class CourseDuplicateException extends Exception {
  public CourseDuplicateException(String code) {
    super(HttpStatus.CONFLICT, "Course with code <" + code + "> already exits.");
  }
}
