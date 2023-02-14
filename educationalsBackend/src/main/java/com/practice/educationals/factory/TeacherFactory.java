package com.practice.educationals.factory;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.practice.educationals.repository.model.CourseEntity;
import com.practice.educationals.repository.model.TeacherEntity;
import com.practice.educationals.request.AssignCourseRequest;
import com.practice.educationals.request.TeacherRequest;
import com.practice.educationals.response.TeacherResponse;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;


@Component
public class TeacherFactory {

  @SneakyThrows
  public TeacherEntity createEntity(TeacherRequest request, String user) {
    return TeacherEntity.builder()
      .id(UUID.randomUUID())
      .identification(Integer.parseInt(request.getIdentification()))
      .name(request.getName())
      .lastname(request.getLastname())
      .contractType(request.getContractType())
      .availableHours(Integer.parseInt(request.getAvailableHours()))
      .assignedCourses(new ObjectMapper().writeValueAsString(request.getAssignCourse()))
      .isActive(true)
      .creationDate(OffsetDateTime.now())
      .creationUser(user)
      .updateDate(OffsetDateTime.now())
      .updateUser(user)
      .build();
  }

  @SneakyThrows
  public TeacherEntity updateEntity(TeacherEntity entity, String user) {
    return entity.toBuilder()
      .name(entity.getName())
      .lastname(entity.getLastname())
      .contractType(entity.getContractType())
      .availableHours(entity.getAvailableHours())
      .assignedCourses(entity.getAssignedCourses())
      .isActive(entity.isActive())
      .updateDate(OffsetDateTime.now())
      .updateUser(user)
      .build();
  }

  @SneakyThrows
  public TeacherEntity updateEntity(TeacherEntity entity, TeacherRequest request, String user) {
    return entity.toBuilder()
      .name(request.getName())
      .lastname(request.getLastname())
      .contractType(request.getContractType())
      .availableHours(Integer.parseInt(request.getAvailableHours()))
      .updateDate(OffsetDateTime.now())
      .updateUser(user)
      .build();
  }

  public TeacherEntity deactivateEntity(TeacherEntity entity, String user){
    return entity.toBuilder()
      .isActive(false)
      .updateDate(OffsetDateTime.now())
      .updateUser(user)
      .build();
  }

  public TeacherResponse createResponse(TeacherEntity entity){
    return TeacherResponse.builder()
      .identification(entity.getIdentification())
      .name(entity.getName())
      .lastname(entity.getLastname())
      .availableHours(entity.getAvailableHours())
      .contractType(entity.getContractType())
      .assignedCourses(buildAssignedCourses(entity.getAssignedCourses()))
      .active(entity.isActive())
      .build();
  }

  @SneakyThrows
  private List<TeacherResponse.AssignedCourses> buildAssignedCourses(String assignedCourses){
    return new ObjectMapper()
      .readValue(assignedCourses, new TypeReference<>() {
      });
  }

  public TeacherResponse.AssignedCourses createAssignedCourse(CourseEntity entity, AssignCourseRequest request){
    return TeacherResponse.AssignedCourses.builder()
      .courseName(entity.getName())
      .from(request.getFrom())
      .to(request.getTo())
      .build();
  }
}
