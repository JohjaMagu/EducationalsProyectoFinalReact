package com.practice.educationals.factory;

import com.practice.educationals.repository.model.CourseEntity;
import com.practice.educationals.request.CourseRequest;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import java.time.OffsetDateTime;
import java.util.UUID;

@Component
public class CourseFactory {

  @SneakyThrows
  public CourseEntity createEntity(CourseRequest request, String user) {
    return CourseEntity.builder()
      .id(UUID.randomUUID())
      .courseCode(request.getCourseCode())
      .name(request.getName())
      .totalHoursWeek(Integer.parseInt(request.getTotalHoursWeek()))
      .creationDate(OffsetDateTime.now())
      .creationUser(user)
      .updateDate(OffsetDateTime.now())
      .updateUser(user)
      .build();
  }

  @SneakyThrows
  public CourseEntity updateEntity(CourseEntity entity, String user) {
    return entity.toBuilder()
      .name(entity.getName())
      .totalHoursWeek(entity.getTotalHoursWeek())
      .updateDate(OffsetDateTime.now())
      .updateUser(user)
      .build();
  }
}
