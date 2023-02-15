package com.practice.educationals.service;

import com.practice.educationals.repository.model.CourseEntity;
import com.practice.educationals.request.CourseRequest;
import java.util.List;

public interface CourseService {

  void save(CourseRequest request, String user);

  void update(CourseRequest request, String user);

  void delete(String code);

  CourseEntity getCourseByCode(String code);

  List<CourseEntity> getCourses();
}
