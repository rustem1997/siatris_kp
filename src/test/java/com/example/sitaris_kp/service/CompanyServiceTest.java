package com.example.sitaris_kp.service;

import com.example.sitaris_kp.model.Company;
import com.example.sitaris_kp.model.User;
import com.example.sitaris_kp.repository.CompanyRepository;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Set;
@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
class CompanyServiceTest {
    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CompanyService service;

    private Company company;
    private User user;

    @Before
    public void init() {
        System.out.println("Работает тетс класса " + CompanyServiceTest.class.getName());
        company = Company.builder()
                .name("new")
                .areaOfWork("area")
                .phoneNumber("123")
                .year(Short.valueOf("10"))
                .countOfEmployee(Short.valueOf("10"))
                .build();
        user = User.builder()
                .name("123")
                .email("123@list.ru")
                .surname("123")
                .password("123")
                .build();

    }
    @After
    public void endTest() {
        System.out.println("Тест класс " + CompanyServiceTest.class.getName() + " отработал");
    }

    @Test
    @Rollback
    public void testCreateNewCompanyWhenAllValuesFilled() { //Добавление компании с заполнеными полями
        companyRepository.save(company);
        Set<Company> all = companyRepository.findAll();
        Assert.assertTrue(all.contains(company));
    }

    @Test(expected = Exception.class)
    @Rollback
    public void testCreateNewCompanyWhenNotAllValuesFilled() {  //Добавление компании с незаполнеными полями
        company.setAreaOfWork(null);
        companyRepository.save(company);
        Set<Company> all = companyRepository.findAll();
        Assert.assertTrue(all.contains(company));
    }

    @Test
    public void testFindCompanyForUserWhenCompanyNotExists() {
        Optional<Company> byId = companyRepository.findById(0L);
        Assert.assertFalse(byId.isPresent());
    }

    @Test
    public void testFindCompanyForUserWhenCompanyExists() {
        Optional<Company> byId = companyRepository.findById(1L);
        Assert.assertTrue(byId.isPresent());
    }

    @Test(expected = Exception.class)
    @Rollback
    public void testHireNewEmployeeToCompanyWhenCompanyNotExists() {    //Отказ на собеседовании
        service.addEmployer(user, 0L);
    }

    @Test
    @Rollback
    public void testHireNewEmployeeToCompanyWhenCompanyExists() {      //Одобрение на собеседовании
        Company company = service.addEmployer(user, 1L);
        Assert.assertNotNull(company.getId());
    }

    @Test
    @Rollback
    public void testDismissEmployerWhenCompanyAndEmployer() {
        service.dismissEmployer(1L, 1L);
    }   //Уволить сотрудника

    @Test(expected = Exception.class)
    @Rollback
    public void testDismissEmployerWhenCompanyExistsButEmployerNot() {
        service.dismissEmployer(0L, 1L);
    }

    @Test(expected = InvalidDataAccessApiUsageException.class)
    public void testAddAdditionalCompanyDataWhenCompanyNotExists() {
        Company companyAfter = service.updateCompany(company);
        Assert.assertNull(companyAfter.getId());
    }

    @Test
    @Rollback
    public void testAddAdditionalCompanyDataWhenCompanyExists() {
        company.setId(1L);
        Company companyAfter = service.updateCompany(company);
        Assert.assertNotNull(companyAfter.getId());
    }


}