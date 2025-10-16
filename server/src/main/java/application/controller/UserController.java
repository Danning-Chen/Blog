package application.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.validation.Valid;

import application.dto.LoginDTO;
import application.dto.RegisterDTO;
import application.service.UserService;

import java.util.Map;
public class UserController {

    private UserService userService;
    
    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    
    @PostMapping("login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO request) throws IOException {

        return ResponseEntity.ok(1); 
    }

    @PostMapping("register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO request) throws IOException {
        
        return ResponseEntity.ok(1); 
    }

    @PostMapping("send-code")
    public ResponseEntity<?> sendVerificationCode(@Valid @RequestBody Map<String, String> request) {
        String email = request.get("email");

        userService.sendVerificationCode(email);
        return ResponseEntity.ok(1); 
    }
}
