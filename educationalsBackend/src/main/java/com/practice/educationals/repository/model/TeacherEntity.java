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
@Table(name = "teacher")
public class TeacherEntity {

  @Id
  @GeneratedValue
  private UUID id;
  private Integer identification;
  private String name;
  private String lastname;
  private String contractType;
  private Integer availableHours;
  private String assignedCourses;
  private boolean isActive;
  private String creationUser;
  private OffsetDateTime creationDate;
  private String updateUser;
  private OffsetDateTime updateDate;
}
