package com.hli.study.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class SpringBootVueTestApplication {
	
//	public static final String APPLICATION_LOCATIONS = "spring.config.location="
//			+ "classpath:application.yml,"
//			+ "classpath:application-real.yml";

	public static void main(String[] args) {
		SpringApplication.run(SpringBootVueTestApplication.class, args);
//		new SpringApplicationBuilder(SpringBootVueTestApplication.class)
//			.properties(APPLICATION_LOCATIONS)
//			.run(args);
	}

}
