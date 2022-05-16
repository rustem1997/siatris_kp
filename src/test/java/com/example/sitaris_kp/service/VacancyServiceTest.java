package com.example.sitaris_kp.service;

import com.example.sitaris_kp.dto.VacancyDto;
import com.example.sitaris_kp.exception.ResourceNotFoundException;
import com.example.sitaris_kp.model.Vacancy;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
class VacancyServiceTest {
    @Autowired
    private com.interview.service.VacancyService vacancyService;

    @Test
    public void testGetVacancyByCompanyIdForUserSearchWhenVacancyExists() {
        ResponseEntity<Vacancy> byId = vacancyService.findVacancyByVacancyId(2L);
        Assert.assertEquals(byId.getStatusCodeValue(), 200);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void testGetVacancyByCompanyIdForUserSearchWhenVacancyNotExists() {
        ResponseEntity<Vacancy> byId = vacancyService.findVacancyByVacancyId(0L);
    }

    @Test
    @Rollback
    public void testChangeStatusWhenUserExists() {
        Vacancy vacancy = vacancyService.changeStatus(2L);
        Assert.assertNotNull(vacancy.getId());
    }

    @Test(expected = ResourceNotFoundException.class)
    @Rollback
    public void testChangeStatusWhenUserNotExists() {
        Vacancy vacancy = vacancyService.changeStatus(0L);
        Assert.assertNull(vacancy);
    }

    @Test(expected = ResourceNotFoundException.class)
    @Rollback
    public void testAddVacancyOnPassedToUserWhenVacancyNotExists() {
        vacancyService.saveVacancyUserOnPassed(1L,0L);
    }

    @Test
    @Rollback
    public void testAddVacancyOnPassedToUserWhenVacancyExists() {
        Vacancy vacancy = vacancyService.saveVacancyUserOnPassed(1L, 1L);
        Assert.assertNotNull(vacancy.getId());
    }

    @Test(expected = ResourceNotFoundException.class)
    @Rollback
    public void testAddVacancyOnFailToUserWhenVacancyNotExists() {
        vacancyService.saveVacancyUserOnFailed(1L,0L);
    }

    @Test
    @Rollback
    public void testAddVacancyOnFailedToUserWhenVacancyExists() {
        Vacancy vacancy = vacancyService.saveVacancyUserOnFailed(1L, 1L);
        Assert.assertNotNull(vacancy.getId());
    }

    @Test
    @Rollback
    public void testFindVacancyByVacancyIdAndUseIdWhenBothExists() {
        ResponseEntity<VacancyDto> vacancyByVacancyIdAndUseId = vacancyService.findVacancyByVacancyIdAndUseId(1L, 1L);
        Assert.assertEquals(vacancyByVacancyIdAndUseId.getStatusCodeValue(), 200);
    }

    @Test(expected = Exception.class)
    @Rollback
    public void testFindVacancyByVacancyIdAndUseIdWhenUserNotExists() {
        ResponseEntity<VacancyDto> vacancyByVacancyIdAndUseId = vacancyService.findVacancyByVacancyIdAndUseId(1L, 0L);
        Assert.assertEquals(vacancyByVacancyIdAndUseId.getStatusCodeValue(), 200);
    }
}