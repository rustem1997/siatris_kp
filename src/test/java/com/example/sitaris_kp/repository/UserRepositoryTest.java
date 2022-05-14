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
        User save = userRepository.save(new User());
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

}