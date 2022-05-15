package com.example.sitaris_kp.repository;

import com.example.sitaris_kp.model.Vacancy;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

@SpringBootTest
@RunWith(SpringRunner.class)
class VacancyRepositoryTest {
    @Autowired
    private VacancyRepository vacancyRepository;
    @Test
    public void testSaveVacancyInDB() {
        Vacancy save = vacancyRepository.save(new Vacancy());
        Assert.assertNotNull(save);
    }
    @Test
    public void testGetByIdVacancy() {
        Optional<Vacancy> byId = vacancyRepository.findById(2L);
        Assert.assertNotNull(byId);
    }
    @Test
    public void testUpdateVacancyInDB() {
        Vacancy save = vacancyRepository.save(new Vacancy());
        Assert.assertNotNull(save);
    }

}