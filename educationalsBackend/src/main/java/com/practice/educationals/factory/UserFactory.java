package com.practice.educationals.factory;

import com.practice.educationals.repository.model.UserEntity;
import com.practice.educationals.request.AuthUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.UUID;

@Component
public class UserFactory {

  @Autowired
  public PasswordEncoder passwordEncoder;

  public UserEntity createEntity(AuthUser user){
    return UserEntity.builder()
      .id(UUID.randomUUID())
      .username(user.getUsername())
      .password(passwordEncoder.encode(user.getPassword()))
      .build();
  }
}
