package com.practice.educationals.request;

import static com.practice.educationals.util.Validation.validNullOrEmpty;
import static com.practice.educationals.util.Validation.validPattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.regex.Pattern;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseRequest {

  private String courseCode;
  private String name;
  private String totalHoursWeek;

  public void validateFields() {
    validNullOrEmpty(this.courseCode, "courseCode");
    validNullOrEmpty(this.name, "name");
    validNullOrEmpty(this.totalHoursWeek, "totalHoursWeek");
    validPattern(Pattern.compile("\\d+"), this.totalHoursWeek, "totalHoursWeek", true);
  }
}
