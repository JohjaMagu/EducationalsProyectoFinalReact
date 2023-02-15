package com.practice.educationals.repository;

import com.practice.educationals.repository.model.TeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface TeacherRepository extends JpaRepository<TeacherEntity, UUID> {
  TeacherEntity findByIdentification(Integer identification);
}
