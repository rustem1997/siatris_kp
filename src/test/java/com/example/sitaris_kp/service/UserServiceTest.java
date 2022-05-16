package com.example.sitaris_kp.service;

import com.example.sitaris_kp.model.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.Optional;
@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
class UserServiceTest {
    @Autowired
    private UserService userService;

    @Test
    public void testFindUserWhenUserExists() {//Просмотр личных даннх
        Optional<User> byId = userService.findById(1L);
        Assert.assertTrue(byId.isPresent());
    }

    @Test
    public void testFindUserWhenUserNotExists() {   //Просмотр личных даннх
        Optional<User> byId = userService.findById(0L);
        Assert.assertFalse(byId.isPresent());
    }

    @Test
    @Rollback
    public void testUpdateUserDataWhenUserExists() {    //Изменение личных данных
        Optional<User> user = userService.findById(1L);
        user.get().setSurname("name");
        User userAfter = userService.saveOrUpdate(user.get());
        Assert.assertEquals(userAfter.getId(), user.get().getId());
    }

    @Test(expected = EmptyResultDataAccessException.class)
    public void testDeleteUserDataWhenUserNotExists() {     ////Удаление аккаунта
        userService.deleteById(0L);
    }

    @Test
    @Rollback
    public void testDeleteUserDataWhenUserExists() {    //Удаление аккаунта
        String answer = userService.deleteById(1L);
        Assert.assertEquals("{\"message\":\"User deleted successfully\"}",answer);
    }
}