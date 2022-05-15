package com.example.sitaris_kp.repository;

import com.example.sitaris_kp.model.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@RunWith(SpringRunner.class)
class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testGetByIdExistingUser() {
        Optional<User> byId = userRepository.findById(2L);
        Assert.assertNotNull(byId);
    }

    @Test
    public void testSaveUserInDB() {
        User user = new User();
        user.setEmail("rustem123");
        user.setName("rustem123");
        user.setPassword("rustem123");
        user.setSurname("rustem123");
        User save = userRepository.saveAndFlush(user);
        Assert.assertNotNull(save);
    }


    @Test
    public void testFindByIdNotExistingUser() {
        Optional<User> byId = userRepository.findById(222L);
        Assert.assertFalse(byId.isPresent());
    }

    @Test
    public void testFindAllUsers() {
        List<User> all = userRepository.findAll();
        Assert.assertNotNull(all);
    }
    @Test
    public void authTrue() {
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
    public void authFalse() {
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
        assertEquals(count,1);
    }
}