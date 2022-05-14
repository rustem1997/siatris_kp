package com.example.sitaris_kp.repository;

import com.example.sitaris_kp.model.Company;
import com.interview.model.Company;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@RunWith(SpringRunner.class)
public class CompanyRepositoryTest {
    @Autowired
    private CompanyRepository companyRepositoryж;
    @Test
    public void testGetByAll() {
        Set<Company> all = companyRepository.findAll();
        Assert.assertNotNull(all);
    }
    @Test
    public void testGetByIdCompany() {
        Optional<Company> byId = companyRepository.findById(2L);
        Assert.assertNotNull(byId);
    }
}
