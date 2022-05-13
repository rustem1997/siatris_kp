package com.example.sitaris_kp.сontroller;
import com.interview.repository.CompanyRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;
@SpringBootTest
public class CompanyControllerTest {


    @Autowired
    private CompanyController companyController;
    @Autowired
    private InterviewController interviewController;
    @Autowired
    private SummaryController summaryController;
    @Autowired
    private UserController userController;
    @Autowired
    private RecommendationController recommendationController;
    @Autowired
    private VacancyController vacancyController;
    @Autowired
    private UserInformationController userInformationController;


    @Test
    void ContextLoadsCompanyController() {
        assertThat(companyController).isNotNull();
    }

    @Test
    void ContextLoadsInterviewController() {
        assertThat(interviewController).isNotNull();
    }

    @Test
    void ContextLoadsSummaryController() {
        assertThat(summaryController).isNotNull();
    }

    @Test
    void ContextLoadsUserController() {
        assertThat(userController).isNotNull();
    }

    @Test
    void ContextLoadsRecommendationController() {
        assertThat(recommendationController).isNotNull();
    }

    @Test
    void ContextLoadsVacancyController() {
        assertThat(vacancyController).isNotNull();
    }

    @Test
    void ContextLoadsUserInformationControllerr() {
        assertThat(userInformationController).isNotNull();
    }
}