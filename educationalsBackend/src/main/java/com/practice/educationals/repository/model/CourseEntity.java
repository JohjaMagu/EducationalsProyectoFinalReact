package com.practice.educationals.repository.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@Entity
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "course")
public class CourseEntity {

  @Id
  @GeneratedValue
  private UUID id;
  private String courseCode;
  private String name;
  private Integer totalHoursWeek;
  private String creationUser;
  private OffsetDateTime creationDate;
  private String updateUser;
  private OffsetDateTime updateDate;
}
