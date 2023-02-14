package com.practice.educationals.request;

import static com.practice.educationals.util.Validation.validNullOrEmpty;
import static com.practice.educationals.util.Validation.validPattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.regex.Pattern;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherRequest {

  private String identification;
  private String name;
  private String lastname;
  private String contractType;
  private String availableHours;
  List<AssignCourseRequest> assignCourse;

  public void validateFields() {
    validNullOrEmpty(this.identification, "identification");
    validPattern(Pattern.compile("\\d+"), this.identification, "identification", true);
    validNullOrEmpty(this.name, "name");
    validNullOrEmpty(this.lastname, "lastname");
    validNullOrEmpty(this.contractType, "contractType");
    validPattern(Pattern.compile("fulltime|halftime"), this.contractType, "contractType", false);
    validNullOrEmpty(this.availableHours, "availableHours");
    validPattern(Pattern.compile("20|40"), this.availableHours, "availableHours", true);
  }
}
