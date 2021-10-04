package com.hli.study.springboot.common.controller;

import java.util.Arrays;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@Configuration
public class ProfileController {
	
	private Environment env;
	
	public ProfileController(Environment env) {
		this.env = env;
	}
	
	@GetMapping("/profile")
	public String profile() {
		return Arrays.stream(env.getActiveProfiles())
				.findFirst()
				.orElse("");
	}
}
