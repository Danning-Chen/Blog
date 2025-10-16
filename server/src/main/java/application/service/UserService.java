package application.service;

import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class UserService {

    private final JavaMailSender mailSender;

    public UserService(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }
    
    public void sendVerificationCode(String email){
        String code = String.valueOf((int) ((Math.random() * 900000) + 100000));
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your Verification Code");
        message.setText("Your verification code is: " + code);
        mailSender.send(message);
    }

}
