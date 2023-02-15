package com.practice.educationals.util;

import com.practice.educationals.service.exception.teacher.TeacherCustomException;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validation {

  public static void validPattern(Pattern pattern, String value, String name, boolean isNumber){
    Matcher mat = pattern.matcher(value);

    if (!mat.find()) {
      throw new TeacherCustomException(BAD_REQUEST, name + " value is not valid");
    }

    if(isNumber){
      try {
        Integer.parseInt(value);
      } catch (NumberFormatException e) {
        throw new TeacherCustomException(BAD_REQUEST, name + " value is not valid");
      }
    }
  }

  public static void validNullOrEmpty(String value, String name) {
    if (value == null) {
      throw new TeacherCustomException(BAD_REQUEST, name + " can't be null");
    }

    if (value.isEmpty()) {
      throw new TeacherCustomException(BAD_REQUEST, name + " can't be empty");
    }
  }
}
