package com.practice.educationals;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class EducationalsApplication {

	public static void main(String[] args) {
		SpringApplication.run(EducationalsApplication.class, args);
	}

}
