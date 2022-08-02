package com.Goorm.group.SpringBoot.Project.Youtube.Controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/hello")
    public String first(){

        return "Hello World";
    }
}
