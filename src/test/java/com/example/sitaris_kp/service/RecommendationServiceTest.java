package com.example.sitaris_kp.service;

import com.example.sitaris_kp.model.Recommendations;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
class RecommendationServiceTest {

    @Autowired
    private RecommendationService service;

    @Test
    @Rollback
    public void testUpdateRecommendation() {
        Recommendations byIdRecommendations = service.findByIdRecommendations(1L);
        byIdRecommendations.setDescriptions("newRecommendation");
        service.updateRecommendations(byIdRecommendations);
    }

    @Test
    public void testFindRecommendationWhenExists() {
        Recommendations byIdRecommendations = service.findByIdRecommendations(1L);
        Assert.assertNotNull(byIdRecommendations.getId());
    }

    @Test(expected = Exception.class)
    public void testFindRecommendationWhenNotExists() {
        Recommendations byIdRecommendations = service.findByIdRecommendations(0L);
        Assert.assertNotNull(byIdRecommendations.getId());
    }
}