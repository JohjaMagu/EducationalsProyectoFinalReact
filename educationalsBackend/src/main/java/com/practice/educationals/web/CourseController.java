package com.practice.educationals.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.practice.educationals.request.CourseRequest;
import com.practice.educationals.response.MessageResponse;
import com.practice.educationals.response.MessageStatusResponse;
import com.practice.educationals.service.CourseService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.val;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/v1/courses")
@CrossOrigin(origins = "http://localhost:3000/")
@RequiredArgsConstructor
public class CourseController {

  private final CourseService service;

  @GetMapping
  public ResponseEntity<Object> getCourseById(@RequestParam String code) {
    val course = service.getCourseByCode(code);

    return ResponseEntity.ok().body(course);
  }

  @GetMapping("/all")
  public ResponseEntity<Object> getAll() {
    val courses = service.getCourses();

    return ResponseEntity.ok().body(courses);
  }

  @PostMapping
  public ResponseEntity<Object> createCourse(@RequestBody CourseRequest request, @RequestParam String user) {
    request.validateFields();
    service.save(request, user);

    return ResponseEntity.status(CREATED)
      .body(MessageStatusResponse.builder().status(CREATED).body("Course was created.").build());
  }

  @PutMapping
  public ResponseEntity<Object> updateCourse(@RequestBody CourseRequest request, @RequestParam String user) {
    request.validateFields();
    service.update(request, user);

    return ResponseEntity.ok()
      .body(MessageStatusResponse.builder().status(OK).body("Course was updated."));
  }

  @SneakyThrows
  @DeleteMapping
  public ResponseEntity<Object> deleteCourse(@RequestParam String code){
    service.delete(code);

    return ResponseEntity.ok().body(MessageStatusResponse.builder().status(OK).body("Course was deleted.").build());
  }
}
