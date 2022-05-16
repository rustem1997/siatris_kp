package com.example.sitaris_kp.repository;

import com.example.sitaris_kp.model.Interview;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

@SpringBootTest
@RunWith(SpringRunner.class)
public class InterviewRepositoryTest {

    @Before
    public void beginTest() {
        System.out.println("Работает тетс класса " + InterviewRepositoryTest.class.getName());
    }
    @After
    public void endTest() {
        System.out.println("Тест класс " + InterviewRepositoryTest.class.getName() + " отработал");
    }


    @Autowired
    private InterviewRepository interviewRepository;

    @Test(timeout = 10000)
    public void testGetByAll() {
        Iterable<Interview> all = interviewRepository.findAll();
        Assert.assertNotNull(all);
    }

    @Test(timeout = 10000)
    public void testGetByIdInterview() {
        Optional<Interview> byId = interviewRepository.findById(2L);
        Assert.assertNotNull(byId);
    }}
