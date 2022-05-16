package com.example.sitaris_kp.service;

import com.example.sitaris_kp.model.Interview;
import com.example.sitaris_kp.model.Utils.StatusOnResolve;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
class InterviewServiceTest {
    @Autowired
    private InterviewService interviewService;

    @Test
    @Rollback
    public void testDefineFormatInterviewWhenAllExist() {   //Определить вид и формат собес, дату и время
        Interview inter = interviewService.findByInterviewId(1L);
        Interview interviewSaved = interviewService.saveInterview(1L, 1L, 1L, inter);
        Assert.assertNotNull(interviewSaved.getId());
    }

    @Test(expected = Exception.class)
    @Rollback
    public void testDefineFormatInterviewWhenUserNotExists() {   //Определить вид и формат собес, дату и время
        Interview inter = interviewService.findByInterviewId(1L);
        Interview interviewSaved = interviewService.saveInterview(0L, 1L, 1L, inter);
        Assert.assertNotNull(interviewSaved.getId());
    }

    @Test(expected = Exception.class)
    @Rollback
    public void testDefineFormatInterviewWhenVacancyNotExists() {   //Определить вид и формат собес, дату и время
        Interview inter = interviewService.findByInterviewId(1L);
        interviewService.saveInterview(1L, 0L, 1L, inter);
    }

    @Test(expected = Exception.class)
    @Rollback
    public void testDefineFormatInterviewWhenEmployeeNotExists() {   //Определить вид и формат собес, дату и время
        Interview inter = interviewService.findByInterviewId(1L);
        interviewService.saveInterview(1L, 1L, 0L, inter);

    }

    @Test
    @Rollback
    public void testAcceptInterviewWhenInterviewExists() {   //Принять собеседование
        Interview inter = interviewService.acceptInterview(1L);
        Assert.assertEquals(StatusOnResolve.ACCEPT.getName(), inter.getResolve());
    }

    @Test(expected = Exception.class)
    @Rollback
    public void testAcceptInterviewWhenInterviewNotExists() {   //Принять собеседование
        interviewService.findByInterviewId(0L);
    }

    @Test
    @Rollback
    public void testRefuseInterviewWhenInterviewExists() {   // Отклонить собеседование
        Interview inter = interviewService.refuseInterview(1L);
        Assert.assertEquals(StatusOnResolve.REFUSE.getName(), inter.getResolve());
    }

    @Test(expected = Exception.class)
    @Rollback
    public void testRefuseInterviewWhenInterviewNotExists() {   //Отклонить собеседование
        interviewService.findByInterviewId(0L);
    }

}