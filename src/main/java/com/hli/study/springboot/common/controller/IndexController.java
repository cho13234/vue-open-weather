package com.hli.study.springboot.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
	@RequestMapping("/mvc")
	public String index() {
		return "/index";
	}
}
