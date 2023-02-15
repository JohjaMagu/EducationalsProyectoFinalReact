package com.practice.educationals.service.impl;

import com.practice.educationals.factory.CourseFactory;
import com.practice.educationals.repository.CourseRepository;
import com.practice.educationals.repository.model.CourseEntity;
import com.practice.educationals.request.CourseRequest;
import com.practice.educationals.service.CourseService;
import com.practice.educationals.service.exception.course.CourseDuplicateException;
import com.practice.educationals.service.exception.course.CourseNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

  private final CourseRepository repository;
  private final CourseFactory factory;

  @Override
  public void save(CourseRequest request, String user) {
    val teacher = repository.findByCourseCode(request.getCourseCode());

    if (teacher != null) {
      throw new CourseDuplicateException(request.getCourseCode());
    }

    repository.save(factory.createEntity(request, user));
  }

  @Override
  public void update(CourseRequest request, String user) {
    val course = repository.findByCourseCode(request.getCourseCode());

    if (course == null) {
      throw new CourseNotFoundException(request.getCourseCode());
    }

    repository.save(factory.updateEntity(course, user));
  }

  @Override
  public void delete(String code) {
    val course = repository.findByCourseCode(code);

    if (course == null) {
      throw new CourseNotFoundException(code);
    }

    repository.delete(course);
  }

  @Override
  public CourseEntity getCourseByCode(String code) {
    val course = repository.findByCourseCode(code);

    if (course == null) {
      throw new CourseNotFoundException(code);
    }

    return course;
  }

  @Override
  public List<CourseEntity> getCourses() {
    return repository.findAll();
  }
}
