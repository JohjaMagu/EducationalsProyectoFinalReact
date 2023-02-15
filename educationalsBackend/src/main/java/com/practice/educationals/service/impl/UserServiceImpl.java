package com.practice.educationals.service.impl;

import com.practice.educationals.factory.UserFactory;
import com.practice.educationals.repository.UserRepository;
import com.practice.educationals.request.AuthUser;
import com.practice.educationals.service.UserService;
import com.practice.educationals.service.exception.auth.UserExistException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository repository;
  private final UserFactory factory;

  @Override
  public void save(AuthUser authUser) {
    if (Boolean.TRUE.equals(repository.existsByUsername(authUser.getUsername()))) {
      throw new UserExistException();
    }

    repository.save(factory.createEntity(authUser));
  }
}
