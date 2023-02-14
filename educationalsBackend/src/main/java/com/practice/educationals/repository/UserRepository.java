package com.practice.educationals.repository;

import com.practice.educationals.repository.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {
  Boolean existsByUsername(String username);
}
