package com.practice.educationals.service.exception.course;

import com.practice.educationals.service.exception.Exception;
import org.springframework.http.HttpStatus;

public class CourseNotFoundException extends Exception {
  public CourseNotFoundException(String code) {
    super(HttpStatus.NOT_FOUND, "Course with code <" + code + "> not found.");
  }
}
