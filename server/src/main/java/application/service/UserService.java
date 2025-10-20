package application.service;

import org.springframework.stereotype.Service;

import application.dto.LoginDTO;
import application.dto.RegisterDTO;
import application.model.UserEntity;
import application.repository.UserRepository;
import application.security.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
public class UserService {

    private JavaMailSender mailSender;
    private UserRepository userRepository;
    private StringRedisTemplate redis;
    private JwtUtils jwtUtils;

    @Autowired
    public UserService(JavaMailSender mailSender, UserRepository userRepository, StringRedisTemplate redis,JwtUtils jwtUtils) {
        this.mailSender = mailSender;
        this.userRepository = userRepository;
        this.redis = redis;
        this.jwtUtils = jwtUtils;
    }

    @Async
    public void sendVerificationCode(String email) {
        // 1. Generate 6-digit random code
        String code = String.valueOf((int) ((Math.random() * 900000) + 100000));

        // 2. Store in Redis (5-minute expiry)
        String key = "verify:" + email;
        redis.opsForValue().set(key, code, 5, TimeUnit.MINUTES);

        // 3. Send the email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your Verification Code");
        message.setText("Your verification code is: " + code);
        mailSender.send(message);
    }

    public Map<String, String> login(LoginDTO dto) {
        Map<String, String> response = new HashMap<>();
        Optional<UserEntity> userOpt = userRepository.findByEmail(dto.getEmail());

        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(dto.getPassword())) {
            response.put("status", "error");
            response.put("message", "Invalid email or password.");
            return response;
        }

        String token = jwtUtils.generateToken(dto.getEmail());

        response.put("status", "success");
        response.put("message", "Login successful.");
        response.put("token", token);

        return response;
    }

    public Map<String, String> register(RegisterDTO dto) {
        Map<String, String> response = new HashMap<>();

        // 1. Check if email already exists
        Optional<UserEntity> existing = userRepository.findByEmail(dto.getEmail());
        if (existing.isPresent()) {
            response.put("status", "error");
            response.put("message", "Email already registered.");
            return response;
        }

        // 2. Check if verification code matches
        String key = "verify:" + dto.getEmail();
        String savedCode = redis.opsForValue().get(key);
        if (savedCode == null || !savedCode.equals(dto.getCode())) {
            response.put("status", "error");
            response.put("message", "Invalid or expired verification code.");
            return response;
        }

        // 3. Create new user
        UserEntity user = new UserEntity();
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword()); // TODO: hash later
        userRepository.save(user);

        // 4. Remove used code
        redis.delete(key);

        // 5. Return success JSON
        response.put("status", "success");
        response.put("message", "Registration successful.");
        return response;
    }

}
