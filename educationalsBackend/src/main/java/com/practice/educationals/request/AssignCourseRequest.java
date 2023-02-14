package com.practice.educationals.request;

import com.practice.educationals.service.exception.teacher.TeacherCustomException;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import java.util.Date;
import java.util.regex.Matcher;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssignCourseRequest {

  private String courseCode;

  @DateTimeFormat(pattern = "YYYY-MM-dd HH:mm:ss")
  @Temporal(TemporalType.TIMESTAMP)
  private Date from;

  @DateTimeFormat(pattern = "YYYY-MM-dd HH:mm:ss")
  @Temporal(TemporalType.TIMESTAMP)
  private Date to;

  public void validateFields() {
    validNullOrEmpty(this.courseCode, "courseCode");
    if (this.from == null)
      throw new TeacherCustomException(BAD_REQUEST, "from value can't be valid");

    if (this.to == null)
      throw new TeacherCustomException(BAD_REQUEST, "to value can't be valid");

  }

  private void validNullOrEmpty(String value, String name) {
    if (value == null) {
      throw new TeacherCustomException(BAD_REQUEST, name + " can't be valid");
    }

    if (value.isEmpty()) {
      throw new TeacherCustomException(BAD_REQUEST, name + " can't be empty");
    }
  }
}
