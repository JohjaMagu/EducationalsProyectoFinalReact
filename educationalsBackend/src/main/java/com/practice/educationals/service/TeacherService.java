package com.practice.educationals.service;

import com.practice.educationals.repository.model.TeacherEntity;
import com.practice.educationals.request.AssignCourseRequest;
import com.practice.educationals.request.TeacherRequest;
import com.practice.educationals.response.TeacherResponse;
import java.util.List;

public interface TeacherService {

  void save(TeacherRequest request, String user);

  void update(String identification, TeacherRequest request, String user);

  void deactivate(Integer identification, String user);

  void delete(Integer identification);

  TeacherResponse getTeacherById(Integer identification);

  List<TeacherEntity> getTeachers();

  void assignCourse(Integer identification, List<AssignCourseRequest> assignCourse, String user);
}
