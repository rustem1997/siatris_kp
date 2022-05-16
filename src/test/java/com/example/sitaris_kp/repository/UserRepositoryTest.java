package com.example.sitaris_kp.repository;

import com.example.sitaris_kp.model.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Test(timeout = 10000)
    public void testGetByIdExistingUser() {
        Optional<User> byId = userRepository.findById(1L);
        Assert.assertNotNull(byId);
    }


    @Test
    @Rollback
    public void testRegisterNewUser() { //Регистрация пользователя
        User user = new User();
        user.setEmail("rustem123");
        user.setName("rustem123");
        user.setPassword("rustem123");
        user.setSurname("rustem123");
        User save = userRepository.saveAndFlush(user);
        Assert.assertNotNull(save.getId());
    }


    @Test
    public void authTrue() { //Вход (положительный)
        String login = "admin";
        String password = "$2a$10$QnrIKkpdWBnRjlz1vJOAyuWvvOD6dKLHhd.PgypSlNpGXyJjCkrHu";
        int count = 0;
        List<User> users = userRepository.findAll();
        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).getEmail().equals(login) && users.get(i).getPassword().equals(password)) {
                count++;
                break;
            }
        }
        assertEquals(count,1);
    }

    @Test
    public void authFalse() {   //Вход (отрицательный)
        String login = "rustem";
        String password = "12345";
        int count = 0;
        List<User> users = userRepository.findAll();
        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).getEmail().equals(login) && users.get(i).getPassword().equals(password)) {
                count++;
                break;
            }
        }
        assertEquals(0,count);
    }
}