package com.practice.educationals.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.OffsetDateTime;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherResponse {

  private Integer identification;
  private String name;
  private String lastname;
  private String contractType;
  private Integer availableHours;
  private List<AssignedCourses> assignedCourses;
  private boolean active;

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class AssignedCourses {
    private String courseName;

    @DateTimeFormat(pattern = "YYYY-MM-dd")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date from;

    @DateTimeFormat(pattern = "YYYY-MM-dd")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date to;
  }
}
