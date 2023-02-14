package com.practice.educationals.web;

import com.practice.educationals.request.AssignCourseRequest;
import com.practice.educationals.request.TeacherRequest;
import com.practice.educationals.response.MessageResponse;
import com.practice.educationals.service.TeacherService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.val;
import static org.springframework.http.HttpStatus.CREATED;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequestMapping(path = "/v1/teachers")
@CrossOrigin(origins = "http://localhost:3000/")
@RequiredArgsConstructor
public class TeacherController {

  private final TeacherService teacherService;

  @GetMapping
  public ResponseEntity<Object> getTeacherById(@RequestParam String identification) {
    val teacher = teacherService.getTeacherById(Integer.parseInt(identification));

    return ResponseEntity.ok().body(teacher);
  }

  @GetMapping("/all")
  public ResponseEntity<Object> getAll() {
    val teachers = teacherService.getTeachers();

    return ResponseEntity.ok().body(teachers);
  }

  @PostMapping
  public ResponseEntity<Object> createTeacher(@RequestBody TeacherRequest request, @RequestParam String user) {
    request.validateFields();
    teacherService.save(request, user);

    return ResponseEntity.status(CREATED).body(MessageResponse.builder().message("Teacher was created.").build());
  }

  @SneakyThrows
  @PutMapping
  public ResponseEntity<Object> updateTeacher(@RequestParam String identification, @RequestBody TeacherRequest request,
                                              @RequestParam String user) {
    request.validateFields();
    teacherService.update(identification, request, user);

    return ResponseEntity.ok().body(MessageResponse.builder().message("Teacher was updated.").build());
  }

  @SneakyThrows
  @DeleteMapping
  public ResponseEntity<Object> deactivateTeacher(@RequestParam String identification, @RequestParam String user) {
    teacherService.deactivate(Integer.parseInt(identification), user);

    return ResponseEntity.ok().body(MessageResponse.builder().message("Teacher was deactivate.").build());
  }

  @SneakyThrows
  @DeleteMapping("/delete")
  public ResponseEntity<Object> deleteTeacher(@RequestParam String identification) {
    teacherService.delete(Integer.parseInt(identification));

    return ResponseEntity.ok().body(MessageResponse.builder().message("Teacher was deleted.").build());
  }

  @PutMapping("/assign-course")
  public ResponseEntity<Object> assignCourse(@RequestParam String identification,
                                             @RequestBody List<AssignCourseRequest> assignCourse,
                                             @RequestParam String user) {
    teacherService.assignCourse(Integer.parseInt(identification), assignCourse, user);

    return ResponseEntity.ok().build();
  }
}
