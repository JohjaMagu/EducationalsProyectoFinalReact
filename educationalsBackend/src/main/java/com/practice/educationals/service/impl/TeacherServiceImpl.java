package com.practice.educationals.service.impl;

import com.practice.educationals.factory.TeacherFactory;
import com.practice.educationals.repository.TeacherRepository;
import com.practice.educationals.repository.model.TeacherEntity;
import com.practice.educationals.request.AssignCourseRequest;
import com.practice.educationals.request.TeacherRequest;
import com.practice.educationals.response.TeacherResponse;
import com.practice.educationals.service.CourseService;
import com.practice.educationals.service.TeacherService;
import com.practice.educationals.service.exception.teacher.TeacherCustomException;
import com.practice.educationals.service.exception.teacher.TeacherDuplicateException;
import com.practice.educationals.service.exception.teacher.TeacherInactiveException;
import com.practice.educationals.service.exception.teacher.TeacherNotFoundException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.val;
import org.springframework.http.HttpStatus;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

  private final TeacherRepository repository;
  private final CourseService courseService;
  private final TeacherFactory factory;

  @Override
  public void save(TeacherRequest request, String user) {
    val teacher = repository.findByIdentification(Integer.parseInt(request.getIdentification()));

    if (teacher != null) {
      throw new TeacherDuplicateException(Integer.parseInt(request.getIdentification()));
    }

    validHoursFromContractType(request);

    repository.save(factory.createEntity(request, user));
  }

  private void validHoursFromContractType(TeacherRequest request) {
    if(request.getContractType().equals("fulltime")){
      if(!request.getAvailableHours().equals("40")){
        throw new TeacherCustomException(HttpStatus.BAD_REQUEST, "fulltime hours should be 40");
      }
    }

    if(request.getContractType().equals("halftime")){
      if(!request.getAvailableHours().equals("20")){
        throw new TeacherCustomException(HttpStatus.BAD_REQUEST, "halftime hours should be 20");
      }
    }
  }

  @Override
  public void update(String identification, TeacherRequest request, String user) {
    try{
      Integer.parseInt(identification);
    }catch (NumberFormatException e){
      throw new TeacherCustomException(BAD_REQUEST, "identification value is not valid");
    }

    val teacher = isExistTeacher(Integer.parseInt(identification));

    if (!teacher.isActive()) {
      throw new TeacherInactiveException(Integer.parseInt(request.getIdentification()));
    }

    repository.save(factory.updateEntity(teacher, request, user));
  }

  @Override
  public void deactivate(Integer identification, String user) {
    val teacher = isExistTeacher(identification);

    repository.save(factory.deactivateEntity(teacher, user));
  }

  @Override
  public void delete(Integer identification) {
    val teacher = isExistTeacher(identification);

    repository.delete(teacher);
  }

  @Override
  public TeacherResponse getTeacherById(Integer identification) {
    val teacher = repository.findByIdentification(identification);

    if (teacher == null) {
      throw new TeacherNotFoundException(identification);
    }

    return factory.createResponse(teacher);
  }

  @Override
  public List<TeacherEntity> getTeachers() {
    return repository.findAll();
  }

  @SneakyThrows
  @Override
  public void assignCourse(Integer identification, List<AssignCourseRequest> assignCourse, String user) {
    if(assignCourse.isEmpty()){
      throw new TeacherCustomException(BAD_REQUEST, "assingCourse list should be at less one item");
    }
    val teacher = isExistTeacher(identification);
    List<TeacherResponse.AssignedCourses> assignedCourses = new ArrayList<>();

    int teacherHours = teacher.getAvailableHours();

    for (AssignCourseRequest assignCourseRequest : assignCourse) {
      assignCourseRequest.validateFields();
      val course = courseService.getCourseByCode(assignCourseRequest.getCourseCode());
      int monthHour = course.getTotalHoursWeek() * 4;
      teacherHours -= monthHour;
      assignedCourses.add(factory.createAssignedCourse(course, assignCourseRequest));
    }

    if (teacherHours < 0) {
      throw new TeacherCustomException(HttpStatus.NOT_ACCEPTABLE, "The courses exceeded the permitted hours");
    }

    teacher.setAvailableHours(teacherHours);
    teacher.setAssignedCourses(new ObjectMapper().writeValueAsString(assignedCourses));

    repository.save(factory.updateEntity(teacher, user));
  }

  public TeacherEntity isExistTeacher(Integer identification) {
    val teacher = repository.findByIdentification(identification);

    if (teacher == null) {
      throw new TeacherNotFoundException(identification);
    }

    return teacher;
  }
}
