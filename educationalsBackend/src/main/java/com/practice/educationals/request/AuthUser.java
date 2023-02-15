package com.practice.educationals.request;

import com.practice.educationals.service.exception.teacher.TeacherCustomException;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthUser {

  @NotNull(message = "username value can't be null")
  @NotEmpty(message = "username value can't be empty")
  private String username;

  @NotNull(message = "password value can't be null")
  @NotEmpty(message = "password value can't be empty")
  private String password;

  public void validateFields() {
    validNullOrEmpty(this.username, "username");
    validNullOrEmpty(this.password, "password");
  }

  private void validNullOrEmpty(String value, String name) {
    if (value == null) {
      throw new TeacherCustomException(BAD_REQUEST, name + " can't be valid");
    }

    if (value.isEmpty()) {
      throw new TeacherCustomException(BAD_REQUEST, name + " can't be empty");
    }
  }
}
