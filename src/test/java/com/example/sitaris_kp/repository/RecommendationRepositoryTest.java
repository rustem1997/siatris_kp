package com.example.sitaris_kp.repository;

import com.example.sitaris_kp.model.Recommendations;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class RecommendationRepositoryTest {
    @Before
    public void beginTest() {
        System.out.println("Работает тетс класса " + RecommendationRepositoryTest.class.getName());
    }
    @After
    public void endTest() {
        System.out.println("Тест класс " + RecommendationRepositoryTest.class.getName() + " отработал");
    }

    @Autowired
    private RecommendationRepository recommendationRepository;

    @Test
    void findAllByUserRecommendation() {
        Iterable<Recommendations> all = recommendationRepository.findAll();
        Assert.assertNotNull(all);
    }

    @Test
    void findAllByEmployer() {
        Optional<Recommendations> byId = recommendationRepository.findById(2L);
        Assert.assertNotNull(byId);
    }

}