package com.practice.educationals.repository;

import com.practice.educationals.repository.model.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, UUID> {
  CourseEntity findByCourseCode(String courseCode);
}
