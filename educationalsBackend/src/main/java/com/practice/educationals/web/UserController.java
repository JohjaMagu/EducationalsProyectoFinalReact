package com.practice.educationals.web;

import com.practice.educationals.request.AuthUser;
import com.practice.educationals.response.MessageResponse;
import com.practice.educationals.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/v1/auth")
@CrossOrigin(origins = "http://localhost:3000/")
@RequiredArgsConstructor
public class UserController {

  private final UserService service;

  @PostMapping("/create")
  public ResponseEntity<Object> createUser(@RequestBody AuthUser authUser) {
    authUser.validateFields();
    service.save(authUser);

    return ResponseEntity.ok().body(MessageResponse.builder().message("User was crated").build());
  }
}
