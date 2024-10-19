package com.jovanni.back_end;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class UserController {
    
    @GetMapping("/user")
    public User getUser(@RequestParam(value = "username") String username) {
        return new User(username, "password");
    }

    @GetMapping("tests")
    public String hello() {
        return "Hello, world!";
    }
    
    
}
